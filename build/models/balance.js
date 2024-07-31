"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const enums_1 = require("../enums");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "BALANCE";
const BalanceSchema = new mongoose_1.Schema({
    partnerId: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        enum: Object.values(enums_1.Currencies),
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}, { timestamps: true });
BalanceSchema.index({ partnerId: 1, currency: 1 }, { unique: true });
BalanceSchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        partnerId: this.partnerId,
        currency: this.currency,
        balance: this.balance,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};
BalanceSchema.methods.entitizeLight = function () {
    return {
        currency: this.currency,
        balance: this.balance
    };
};
BalanceSchema.statics.findByPartnerAndCurrency = async function (partnerId, currency) {
    let balance;
    try {
        balance = await this.findOne({ partnerId, currency });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
    }
    return balance;
};
BalanceSchema.statics.findByPartner = async function (partnerId) {
    let balance;
    try {
        balance = await this.find({ partnerId });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
    }
    return balance;
};
const Balance = mongoose_1.default.model("Balance", BalanceSchema);
exports.Balance = Balance;
