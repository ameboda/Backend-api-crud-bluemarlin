import  {Decimal128, Document, model, Number, Schema, Types } from "mongoose";
import CounterModel from "./counter.model";



export interface orderModel extends Document {
  param: any;
  [X: string]: any;
  error: any;
  _id: Types.ObjectId; 
  idOrder: number; 
  Customer: Types.ObjectId;
  formpayment: string; 
  dateOrder: Date; 
  dateDelivery: Date;
  Sellers: Types.ObjectId;
//   products: Types.ObjectId; 
  observations: string; 
  subtotal: number; 
  iva: number; 
  total: number;   
  creationdate: Date;
}

const orderSchema = new Schema({


  idOrder: {
    type : Number,  
    unique: true
  },

  Customer: {
    type: Schema.Types.ObjectId, 
    ref: "Customer"
  }, 
  
  formpayment: {
    type: String, 
    required: true
  },

  dateOrder: {
    type: Date,
    default: Date.now
  },

  dateDelivery: {
    type: Date
  },

  Sellers: {
    type: Schema.Types.ObjectId,
    ref: "Sellers"
  }, 
  
  // products: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Products"
  // }, 

  observations: {
   type: String,
   required: true
  },

  subtotal: {
    type: Number,
    required: true
  }, 

  iva: {
    type: Number,
    required: true
  },

  total: {
    type: Number,
    required: true
  }, 
  
  creationdate: {
    type: Date,
    default: Date.now,
  },
});



// autoincremento del idOrder 
orderSchema.pre('save', async function (this: orderModel, next) {
  if (this.isNew) {
    const counter = await CounterModel.findOneAndUpdate(
      { id: 'idOrder' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    this.idOrder = counter?.sequence_value || 0; 
  }
  next();
});



const OrderModel = model<orderModel>("Order", orderSchema);

export default OrderModel ;


 

