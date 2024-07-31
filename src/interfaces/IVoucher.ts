import { Currencies, UsageStatuses } from "../enums";
import { Document, Model } from "mongoose";

export interface IVoucher extends Document {
    partnerId: string;
    userId: string,
    code: string;
    amount: number;
    status: UsageStatuses;
    currency: Currencies;
    usageDate: Date;
    createdAt: Date;
    updatedAt: Date;
    entitize: () => IVoucher;
}

export interface IVoucherModel extends Model<IVoucher> {
    findByCode(code: string): Promise<IVoucher | null>;
    findPartnerCodes(partnerId: string, page: number, pageSize: number, status?: UsageStatuses | null, currency?: Currencies | null): Promise<IVoucher[] | []>;
    findPartnerCodesCount(partnerId: string, status?: UsageStatuses | null, currency?: Currencies | null): Promise<number>
}

export interface IVoucherBody {
    code: string,
    partnerId: string,
    amount: number,
    currency: Currencies,
    userId?: string
}