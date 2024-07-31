import { Document, Model } from "mongoose";
import { Currencies } from "../enums";


export interface IHistory extends Document {
    partnerId: String;
    currency: Currencies;
    amount: Number;
    message: String;
    entitize: () => IHistory;
}


export interface IHistoryModel extends Model<IHistory> {

}

export interface IHistoryData {
    currency: Currencies;
    amount: Number;
    message: String;
    partnerId: String
}