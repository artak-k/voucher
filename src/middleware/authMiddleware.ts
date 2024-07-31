import { Request, Response, NextFunction } from "express";
import { AuthenticationFailedError } from "../errors";
import { Partner } from "../models/partner";
import config from "../config/config";


export function authMiddleware() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const key = req.header("X-API-KEY");
    if (!key) {
      next(new AuthenticationFailedError());
    }

    const partner = await Partner.findByKey(key as string);
    if (!partner) {
      next(new AuthenticationFailedError());
    } else {
      req['partnerId'] = partner._id.toString() as string;
      req['partner'] = partner;
      next();
    }
  };
}


export function adminAuthMiddleware() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const key = req.header("X-API-KEY");
    if (!key || key !== config.key) {
      next(new AuthenticationFailedError());
    }
    next();
  };
}