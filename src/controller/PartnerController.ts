import { NextFunction, Request, Response } from "express";
import { Partner } from "../models/partner";
import Helper from '../helper/voucher';
import { ApiResponse } from "../response/ApiResponse";

class PartnerController {
    public static async add(req: Request, res: Response, next: NextFunction): Promise<any> {
     const { name } = req.body;
     const partner = new Partner({
        name,
        key: Helper.generateCode(30)
     })

     await partner.save()


     return res.json(new ApiResponse(partner.entitize()))
    }
}

export default PartnerController