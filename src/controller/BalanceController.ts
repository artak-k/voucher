import { NextFunction, Request, Response } from "express";
import { Balance } from "../models/balance";
import { NotFoundError } from "../errors";
import { Partner } from "../models/partner";
import { History } from "../models/history";
import { IHistoryData } from "../interfaces/IHistory";
import Decimal from "decimal.js";


class BalanceController {
    public static async fillOrCreate(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { amount, currency, partnerId } = req.body;

        const partner = await Partner.findById(partnerId);
        if (!partner) {
            next(new NotFoundError('Partner not found'))
            return
        }

        let partnerBalance = await Balance.findByPartnerAndCurrency(partnerId, currency);
        if (partnerBalance && partnerBalance.currency === currency) {
            partnerBalance.balance = Decimal.add(partnerBalance.balance, amount).toNumber()
        } else {
            partnerBalance = new Balance({ partnerId, balance: amount, currency })
        }
        await partnerBalance.save();

        const historyData: IHistoryData = {
            amount,
            currency,
            partnerId,
            message: `Balance filled ${amount} ${currency}`
        };
        const history = new History(historyData);
        await history.save();

        return res.json({ ...partnerBalance.entitize() });
    }
}

export default BalanceController