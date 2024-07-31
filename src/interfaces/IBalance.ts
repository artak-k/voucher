import { Document, Model } from "mongoose";
import { Currencies } from "../enums";

export interface IBalance extends Document {
    partnerId: string;
    balance: number;
    currency: Currencies;
    entitize: () => IBalance;
    entitizeLight: () => IBalance;
}

export interface IBalanceModel extends Model<IBalance> {
    findByPartnerAndCurrency(partnerId: string, currency: Currencies | null): Promise<IBalance | null>;
    findByPartner(partnerId: string): Promise<IBalance[] | []>;
}