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
exports.Voucher = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const enums_1 = require("../enums");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "VOUCHER";
const VoucherSchema = new mongoose_1.Schema({
    partnerId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(enums_1.UsageStatuses),
        default: enums_1.UsageStatuses.UNUSED,
    },
    currency: {
        type: String,
        enum: Object.values(enums_1.Currencies),
        default: enums_1.Currencies.KZT,
    },
    usageDate: {
        type: Date,
    },
}, { timestamps: true });
VoucherSchema.methods.entitize = function () {
    const data = {
        id: this._id.toString(),
        partnerId: this.partnerId,
        code: this.code,
        amount: this.amount,
        status: this.status,
        currency: this.currency,
        usageDate: this.usageDate,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
    if (this.userId) {
        data.userId = this.userId;
    }
    return data;
};
VoucherSchema.statics.findByCode = async function (code) {
    let voucher;
    try {
        voucher = await this.findOne({ code });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
    }
    return voucher;
};
VoucherSchema.statics.findPartnerCodes = async function (partnerId, page, pageSize, status, currency) {
    const query = { partnerId };
    status && (query.status = status);
    currency && (query.currency = currency);
    let vouchers;
    try {
        vouchers = await this.find(query).sort({ '_id': 1 }).skip((page - 1) * pageSize).limit(pageSize);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
    }
    return vouchers;
};
VoucherSchema.statics.findPartnerCodesCount = async function (partnerId, status, currency) {
    const query = { partnerId };
    status && (query.status = status);
    currency && (query.currency = currency);
    let vouchersCount;
    try {
        vouchersCount = await this.countDocuments(query);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
    }
    return vouchersCount;
};
const Voucher = mongoose_1.default.model("Voucher", VoucherSchema);
exports.Voucher = Voucher;
