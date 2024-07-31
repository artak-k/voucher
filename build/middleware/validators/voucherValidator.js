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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateVoucherValidator = exports.partnerVouchersValidator = exports.createVoucherValidator = void 0;
const enums_1 = require("../../enums");
const joiValidatorMiddleware_1 = require("../joiValidatorMiddleware");
const Joi = __importStar(require("joi"));
exports.createVoucherValidator = (0, joiValidatorMiddleware_1.joiValidator)(Joi.object({
    currency: Joi.string().valid(...Object.values(enums_1.Currencies)).required(),
    amount: Joi.number().integer().greater(0).required(),
    count: Joi.number().integer().greater(0).required(),
    userId: Joi.string().optional()
}));
exports.partnerVouchersValidator = (0, joiValidatorMiddleware_1.joiValidator)(Joi.object({
    status: Joi.string().valid(...Object.values(enums_1.UsageStatuses)).optional(),
    currency: Joi.string().valid(...Object.values(enums_1.Currencies)).optional(),
    page: Joi.number().integer().greater(0).optional(),
    pageSize: Joi.number().integer().greater(0).optional()
}), "query");
exports.activateVoucherValidator = (0, joiValidatorMiddleware_1.joiValidator)(Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required(),
}));