"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.adminAuthMiddleware = adminAuthMiddleware;
const errors_1 = require("../errors");
const partner_1 = require("../models/partner");
const config_1 = __importDefault(require("../config/config"));
function authMiddleware() {
    return async function (req, res, next) {
        const key = req.header("X-API-KEY");
        if (!key) {
            next(new errors_1.AuthenticationFailedError());
        }
        const partner = await partner_1.Partner.findByKey(key);
        if (!partner) {
            next(new errors_1.AuthenticationFailedError());
        }
        else {
            req['partnerId'] = partner._id.toString();
            req['partner'] = partner;
            next();
        }
    };
}
function adminAuthMiddleware() {
    return async function (req, res, next) {
        const key = req.header("X-API-KEY");
        if (!key || key !== config_1.default.key) {
            next(new errors_1.AuthenticationFailedError());
        }
        next();
    };
}
