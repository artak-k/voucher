import { Currencies } from "../../enums";
import { joiValidator } from "../joiValidatorMiddleware";
import * as Joi from "joi";

export const addPartnerValidator = joiValidator(Joi.object({
    currency: Joi.string().valid(...Object.values(Currencies)).required(),
    amount: Joi.number().integer().greater(0).required(),
    partnerId: Joi.string().hex().length(24).required()
}));

export const createPartnerValidator = joiValidator(Joi.object({
    name: Joi.string().required(),
}))