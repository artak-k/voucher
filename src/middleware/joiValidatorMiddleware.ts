import asyncHandler from "express-async-handler";
import { ArraySchema, ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors";
import { TargetType } from "../types";

export function joiValidator(schema: ObjectSchema | ArraySchema, target: keyof TargetType = "body") {
  return asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req[target]);
    if (error) {
      next(new ValidationError(error.details[0].message));
    } else {
      next();
    }
  });
}
