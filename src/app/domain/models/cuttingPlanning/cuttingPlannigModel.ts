
import { Decimal128, Document, model, Schema, Types } from "mongoose";
import CountercuttingModel from "./countercuttingModel";



export interface cuttingModel extends Document {

    [X: string]: any;
    error: any;
    _id: Types.ObjectId;
    idCutting: number;
    order: Types.ObjectId;
    inventorytextile: Types.ObjectId;
    products: Types.ObjectId;
    Markerdetails: {
        size: string,
        marklength: Decimal128,
        layers: number

    };
    metersdelivered: number;
    metersCutting: number;
    usablepieces: number;
    unusablepieces: number;
    realAverage: number;

}

const cuttingSchema = new Schema({
    idCutting: {
        type: Number,
        unique: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    inventorytextile: {
        type: Schema.Types.ObjectId,
        ref: "inventorytextile"
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products",
    }],
    Markerdetails: {
        size: {
            type: [
                {
                    nameLetter: { type: String },
                    nameNumber: { type: Number },
                },
            ],
            default: [],
        },
        marklength: { type: Schema.Types.Decimal128 },
        layers: { type: Number }
    },
    metersdelivered: {
        type: Number,
        required: true

    },
    metersCutting: {
        type: Number,
        required: true

    },
    usablepieces: {
        type: Number,
        required: true

    },
    unusablepieces: {
        type: Number,
        required: true
    },
    realAverage:{
        type: Number,
         
    }
}); 


// autoincremento del idOrder 
cuttingSchema.pre('save', async function (this: cuttingModel, next) {
    if (this.isNew) {
      const countercutting = await CountercuttingModel.findOneAndUpdate(
        { id: 'idCutting' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
  
      this.idCutting = countercutting?.sequence_value || 0; 
    }
    next();
  });


const CuttingModel = model<cuttingModel>("cutting", cuttingSchema);
export default CuttingModel;

