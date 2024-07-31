import mongoose, { Schema } from "mongoose"
import { IPartner, IPartnerModel } from "../interfaces/IPartner";
import logging from "../config/logging";
const NAMESPACE = 'PARTNER';


const PartnerSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        key: {
            type: String,
            required: true,
            unique: true
        }
    }, { timestamps: true })

PartnerSchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        name: this.name,
        key: this.key
    };
};

PartnerSchema.statics.findByKey = async function (key: string): Promise<IPartner> {
    let partner;

    try {
        partner = await this.findOne({ key })
    } catch (error: any) {
        logging.error(NAMESPACE, error.message);
    }

    return partner;
}

PartnerSchema.methods.entitize = function () {
    return {
        id: this._id.toString(),
        name: this.name,
        key: this.key
    };
};

const Partner: IPartnerModel = mongoose.model<IPartner, IPartnerModel>("Partner", PartnerSchema);

export { Partner };