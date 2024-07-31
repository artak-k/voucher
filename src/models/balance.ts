import mongoose, { Schema } from "mongoose";
import { Currencies } from "../enums";
import logging from "../config/logging";
import { IBalance, IBalanceModel } from "../interfaces/IBalance";
const NAMESPACE = "BALANCE"


const BalanceSchema = new Schema(
    {
        partnerId: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            enum: Object.values(Currencies),
            required: true
        },
        balance: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

BalanceSchema.index({ partnerId: 1, currency: 1 }, { unique: true });

BalanceSchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        partnerId: this.partnerId,
        currency: this.currency,
        balance: this.balance,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};
BalanceSchema.methods.entitizeLight = function () {
    return {
        currency: this.currency,
        balance: this.balance
    };
};

BalanceSchema.statics.findByPartnerAndCurrency = async function (partnerId, currency): Promise<IBalance> {
    let balance;

    try {
        balance = await this.findOne({ partnerId, currency });
    } catch (error: any) {
        logging.error(NAMESPACE, error.message);
    }

    return balance;
}
BalanceSchema.statics.findByPartner = async function (partnerId): Promise<IBalance[]> {
    let balance;

    try {
        balance = await this.find({ partnerId });
    } catch (error: any) {
        logging.error(NAMESPACE, error.message);
    }

    return balance;
}


const Balance: IBalanceModel = mongoose.model<IBalance, IBalanceModel>("Balance", BalanceSchema);

export { Balance };
