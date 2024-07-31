import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../response/ApiResponse";
import { Voucher } from "../models/voucher";
import { ActionNotAllowedError, AlreadyUsed, BalanceNotEnough, PermissionDenied, UnknownError, VoucherNotFoundError } from "../errors";
import { Currencies, UsageStatuses } from "../enums";
import Helper from "../helper/voucher";
import { IVoucher, IVoucherBody } from "../interfaces/IVoucher";
import { Balance } from "../models/balance";
import Decimal from "decimal.js";
import { IBalance } from "../interfaces/IBalance";


class VoucherController {
    public static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        const partnerId = req.partnerId as string;
        const { amount, count, currency, userId } = req.body;
        
        const partnerBalance = await Balance.findByPartnerAndCurrency(partnerId, currency);
        const totalAmount = Decimal.mul(count, amount).toNumber();
        if (!partnerBalance || partnerBalance.balance < totalAmount) {
            next(new BalanceNotEnough());
            return;
        }

        const vouchers: any = [];
        for (let i = 0; i < count; i++) {
            const data: IVoucherBody = {
                partnerId,
                code: Helper.generateCode(),
                amount,
                currency
            }
            userId && (data.userId = userId);
            const voucher = new Voucher(data);

            vouchers.push(voucher);
        }
        try {
            await Promise.all(vouchers.map((voucher: IVoucher) => voucher.save()));
            partnerBalance.balance = Decimal.sub(partnerBalance.balance, totalAmount).toNumber();
            await partnerBalance.save();
        } catch (error: any) {
            next(new UnknownError());
        }

        return res.json(new ApiResponse({ total: vouchers.length, vouchers: vouchers.map((v: IVoucher) => v.entitize()) }));
    }

    public static async getPartnerVouchers(req: Request, res: Response, next: NextFunction): Promise<any> {
        const partnerId = req.partnerId as string;
        const { status, currency } = req.query;
        const page = req.query.page ? Number(req.query.page) : 1;
        const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 50;

        const vouchers: IVoucher[] = await Voucher.findPartnerCodes(partnerId as string, page, pageSize, status as UsageStatuses, currency as Currencies);
        const vouchersCount: number = await Voucher.findPartnerCodesCount(partnerId as string, status as UsageStatuses, currency as Currencies);

        return res.json(new ApiResponse({ total: vouchersCount, vouchers: vouchers.map(voucher => voucher.entitize()) }));
    }

    public static async getPartnerBalance(req: Request, res: Response, next: NextFunction): Promise<any> {
        const partnerId = req.partnerId as string;

        const partnerBalance: IBalance[] = await Balance.findByPartner(partnerId);

        return res.json(new ApiResponse(partnerBalance.map(balance => balance.entitizeLight())));
    }

    public static async activate(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { code, userId } = req.body;
        const voucher = await Voucher.findByCode(code)

        if (!voucher) {
            next(new VoucherNotFoundError())
            return;
        }

        if (voucher.partnerId !== req.partnerId) {
            next(new ActionNotAllowedError());
            return;
        }

        if (voucher.userId && userId !== voucher.userId) {
            next(new PermissionDenied());
            return;
        }

        if (voucher.status === UsageStatuses.USED) {
            next(new AlreadyUsed())
            return;
        }

        voucher.status = UsageStatuses.USED;
        await voucher.save();

        return res.json(new ApiResponse(voucher.entitize()));
    }
}

export default VoucherController;
