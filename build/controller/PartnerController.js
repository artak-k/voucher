"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const partner_1 = require("../models/partner");
const voucher_1 = __importDefault(require("../helper/voucher"));
const ApiResponse_1 = require("../response/ApiResponse");
class PartnerController {
    static async add(req, res, next) {
        const { name } = req.body;
        const partner = new partner_1.Partner({
            name,
            key: voucher_1.default.generateCode(30)
        });
        await partner.save();
        return res.json(new ApiResponse_1.ApiResponse(partner.entitize()));
    }
}
exports.default = PartnerController;
