"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse_1 = require("../response/ApiResponse");
const voucher_1 = require("../models/voucher");
const errors_1 = require("../errors");
const enums_1 = require("../enums");
const voucher_2 = __importDefault(require("../helper/voucher"));
const balance_1 = require("../models/balance");
const decimal_js_1 = __importDefault(require("decimal.js"));
class VoucherController {
    static async create(req, res, next) {
        const partnerId = req.partnerId;
        const { amount, count, currency, userId } = req.body;
        const partnerBalance = await balance_1.Balance.findByPartnerAndCurrency(partnerId, currency);
        const totalAmount = decimal_js_1.default.mul(count, amount).toNumber();
        if (!partnerBalance || partnerBalance.balance < totalAmount) {
            next(new errors_1.BalanceNotEnough());
            return;
        }
        const vouchers = [];
        for (let i = 0; i < count; i++) {
            const data = {
                partnerId,
                code: voucher_2.default.generateCode(),
                amount,
                currency
            };
            userId && (data.userId = userId);
            const voucher = new voucher_1.Voucher(data);
            vouchers.push(voucher);
        }
        try {
            await Promise.all(vouchers.map((voucher) => voucher.save()));
            partnerBalance.balance = decimal_js_1.default.sub(partnerBalance.balance, totalAmount).toNumber();
            await partnerBalance.save();
        }
        catch (error) {
            next(new errors_1.UnknownError());
        }
        return res.json(new ApiResponse_1.ApiResponse({ total: vouchers.length, vouchers: vouchers.map((v) => v.entitize()) }));
    }
    static async getPartnerVouchers(req, res, next) {
        const partnerId = req.partnerId;
        const { status, currency } = req.query;
        const page = req.query.page ? Number(req.query.page) : 1;
        const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 50;
        const vouchers = await voucher_1.Voucher.findPartnerCodes(partnerId, page, pageSize, status, currency);
        const vouchersCount = await voucher_1.Voucher.findPartnerCodesCount(partnerId, status, currency);
        return res.json(new ApiResponse_1.ApiResponse({ total: vouchersCount, vouchers: vouchers.map(voucher => voucher.entitize()) }));
    }
    static async getPartnerBalance(req, res, next) {
        const partnerId = req.partnerId;
        const partnerBalance = await balance_1.Balance.findByPartner(partnerId);
        return res.json(new ApiResponse_1.ApiResponse(partnerBalance.map(balance => balance.entitizeLight())));
    }
    static async activate(req, res, next) {
        const { code, userId } = req.body;
        const voucher = await voucher_1.Voucher.findByCode(code);
        if (!voucher) {
            next(new errors_1.VoucherNotFoundError());
            return;
        }
        if (voucher.partnerId !== req.partnerId) {
            next(new errors_1.ActionNotAllowedError());
            return;
        }
        if (voucher.userId && userId !== voucher.userId) {
            next(new errors_1.PermissionDenied());
            return;
        }
        if (voucher.status === enums_1.UsageStatuses.USED) {
            next(new errors_1.AlreadyUsed());
            return;
        }
        voucher.status = enums_1.UsageStatuses.USED;
        await voucher.save();
        return res.json(new ApiResponse_1.ApiResponse(voucher.entitize()));
    }
}
exports.default = VoucherController;
