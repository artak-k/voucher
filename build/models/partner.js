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
exports.Partner = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'PARTNER';
const PartnerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    key: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
PartnerSchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        name: this.name,
        key: this.key
    };
};
PartnerSchema.statics.findByKey = async function (key) {
    let partner;
    try {
        partner = await this.findOne({ key });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
    }
    return partner;
};
PartnerSchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        name: this.name,
        key: this.key
    };
};
const Partner = mongoose_1.default.model("Partner", PartnerSchema);
exports.Partner = Partner;
