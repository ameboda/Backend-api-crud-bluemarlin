import { Document, model, Schema, Types } from "mongoose";

export interface productModel extends Document {
  [X: string]: any;
  error: any;
  _id: Types.ObjectId;
  codProduct: string;
  name: string;
  category: Types.ObjectId;
  size: {
    nameLetter: string;
    nameNumber: number;
  }[];
  colors: Types.ObjectId

  creationdate: Date;
}

const productSchema = new Schema({
  codProduct: {
    type: String,
    required: true,
    // unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "CategoriesProduct"
  },

  size: {
    type: [
      {
        nameLetter: { type: String },
        nameNumber: { type: Number },
        },
    ],
    default: [], // Define un valor inicial para el array como vacío
  },
  colors:{
    type: Schema.Types.ObjectId,
    ref: "colors"
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = model<productModel>("Products", productSchema);

export default ProductModel;



 