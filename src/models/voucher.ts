import mongoose, { Model, Document, Schema } from "mongoose";
import { Currencies, UsageStatuses } from "../enums";
import { VoucherNotFoundError } from "../errors";
import logging from "../config/logging";
import { IVoucher, IVoucherModel } from "../interfaces/IVoucher";
const NAMESPACE = "VOUCHER";


const VoucherSchema = new Schema<IVoucher>(
  {
    partnerId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UsageStatuses),
      default: UsageStatuses.UNUSED,
    },
    currency: {
      type: String,
      enum: Object.values(Currencies),
      default: Currencies.KZT,
    },
    usageDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

VoucherSchema.methods.entitize = function () {
  const data: any = {
    id: this._id.toString(),
    partnerId: this.partnerId,
    code: this.code,
    amount: this.amount,
    status: this.status,
    currency: this.currency,
    usageDate: this.usageDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }

  if (this.userId) {
    data.userId = this.userId
  }
  return data;
};

VoucherSchema.statics.findByCode = async function (code: string): Promise<IVoucher> {
  let voucher;
  try {
    voucher = await this.findOne({ code });
  } catch (error: any) {
    logging.error(NAMESPACE, error.message);
  }
  return voucher;
};

VoucherSchema.statics.findPartnerCodes = async function (partnerId: string, page: number, pageSize: number, status?: UsageStatuses | null, currency?: Currencies| null): Promise<IVoucher[]> {
  const query: { partnerId: string, status?: UsageStatuses, currency?: Currencies} = { partnerId };

  status && (query.status = status);
  currency && (query.currency = currency);
  let vouchers;
  try {
    vouchers = await this.find(query).sort({ '_id': 1 }).skip((page - 1) * pageSize).limit(pageSize);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message);
  }
  return vouchers;
}

VoucherSchema.statics.findPartnerCodesCount = async function (partnerId: string, status?: UsageStatuses | null, currency?: Currencies| null): Promise<number> {
  const query: { partnerId: string, status?: UsageStatuses, currency?: Currencies} = { partnerId };

  status && (query.status = status);
  currency && (query.currency = currency);
  let vouchersCount;
  try {
    vouchersCount = await this.countDocuments(query);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message);
  }
  return vouchersCount;
}

const Voucher: IVoucherModel = mongoose.model<IVoucher, IVoucherModel>("Voucher", VoucherSchema);

export { Voucher };