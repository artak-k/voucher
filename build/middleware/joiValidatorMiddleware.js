"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidator = joiValidator;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errors_1 = require("../errors");
function joiValidator(schema, target = "body") {
    return (0, express_async_handler_1.default)(async function (req, res, next) {
        const { error } = schema.validate(req[target]);
        if (error) {
            next(new errors_1.ValidationError(error.details[0].message));
        }
        else {
            next();
        }
    });
}
