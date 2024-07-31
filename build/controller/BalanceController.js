"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const balance_1 = require("../models/balance");
const errors_1 = require("../errors");
const partner_1 = require("../models/partner");
const history_1 = require("../models/history");
const decimal_js_1 = __importDefault(require("decimal.js"));
class BalanceController {
    static async fillOrCreate(req, res, next) {
        const { amount, currency, partnerId } = req.body;
        const partner = await partner_1.Partner.findById(partnerId);
        if (!partner) {
            next(new errors_1.NotFoundError('Partner not found'));
            return;
        }
        let partnerBalance = await balance_1.Balance.findByPartnerAndCurrency(partnerId, currency);
        if (partnerBalance && partnerBalance.currency === currency) {
            partnerBalance.balance = decimal_js_1.default.add(partnerBalance.balance, amount).toNumber();
        }
        else {
            partnerBalance = new balance_1.Balance({ partnerId, balance: amount, currency });
        }
        await partnerBalance.save();
        const historyData = {
            amount,
            currency,
            partnerId,
            message: `Balance filled ${amount} ${currency}`
        };
        const history = new history_1.History(historyData);
        await history.save();
        return res.json({ ...partnerBalance.entitize() });
    }
}
exports.default = BalanceController;
