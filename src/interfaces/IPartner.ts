import { Document, Model } from "mongoose";

export interface IPartner extends Document {
    name: string;
    key: string;
    entitize: () => IPartner;
}

export interface IPartnerModel extends Model<IPartner> {
    findByKey(key: string): Promise<IPartner | null>;
}


export interface IPartnerReq {
    id: string,
    key: string,
    name: string
}