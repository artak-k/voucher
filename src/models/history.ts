import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import { IPartnerModel } from "../interfaces/IPartner";
import { IHistory } from "../interfaces/IHistory";
import { Currencies } from "../enums";
const NAMESPACE = "HISTORY"
const ObjectId = Schema.Types.ObjectId;

const HistorySchema = new Schema(
    {
        currency: {
            type: String,
            enum: Object.values(Currencies),
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        partnerId: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

HistorySchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        partnerId: this.partnerId,
        message: this.message,
        currency: this.currency,
        amount: this.amount
    };
};


const History: IPartnerModel = mongoose.model<IHistory, IPartnerModel>("History", HistorySchema);

export { History };