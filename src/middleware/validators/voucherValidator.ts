import { Currencies, UsageStatuses } from "../../enums";
import { joiValidator } from "../joiValidatorMiddleware";
import * as Joi from "joi";

export const createVoucherValidator = joiValidator(Joi.object({
    currency: Joi.string().valid(...Object.values(Currencies)).required(),
    amount: Joi.number().integer().greater(0).required(),
    count: Joi.number().integer().greater(0).required(),
    userId: Joi.string().optional()
}));


export const partnerVouchersValidator = joiValidator(Joi.object({
    status: Joi.string().valid(...Object.values(UsageStatuses)).optional(),
    currency: Joi.string().valid(...Object.values(Currencies)).optional(),
    page: Joi.number().integer().greater(0).optional(),
    pageSize: Joi.number().integer().greater(0).optional()
}), "query")

export const activateVoucherValidator = joiValidator(Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required(),
}))