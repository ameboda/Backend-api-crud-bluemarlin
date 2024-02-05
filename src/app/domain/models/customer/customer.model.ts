// import mongoose, { Document, model, Schema } from "mongoose";
import { Document, model, Schema } from "mongoose";

export interface ICustomerModel extends Document {
  [x: string]: any;
  nit: number;
  phoneCompany: number;
  phoneContact: number;
  address:string;
  companyName:string;
  namecontact:string;
  lastnameContact:string;
  sizeNumber:boolean;
  dateCreate: Date;
}

const CustomerSchema = new Schema({
  nit: {
    type: Number,
    required: true,
  },

  phoneCompany: {
    type: Number,
    required: true,
  },

  phoneContact: {
    type: Number
  },

  address: {
    type: String,
    required: true,
  },

  companyName: {
    type: String,
    required: true
  },

  namecontact: {
    type: String,
    required: true
  },

  lastnameContact: {
    type: String,
    required: true
  },

  sizeNumber: {
    type: Boolean,
    default: false
  },

  dateCreate: { type: Date, default: Date.now },
});

const CustomerModel = model<ICustomerModel>("Customer", CustomerSchema);

export default CustomerModel;
