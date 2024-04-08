import  {Decimal128, Document, model, Schema, Types } from "mongoose";
import CounterModel from "./gateway/counter.model";



export interface orderModel extends Document {
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
  subtotal: Decimal128; 
  iva: number; 
  total: Decimal128;   
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
    type: Schema.Types.Decimal128,
    required: true
  }, 

  iva: {
    type: Number,
    required: true
  },

  total: {
    type: Schema.Types.Decimal128,
    required: true
  }, 
  
  creationdate: {
    type: Date,
    default: Date.now,
  },
});



// Pre-save hook para el autoincremento del idOrder 
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


 

