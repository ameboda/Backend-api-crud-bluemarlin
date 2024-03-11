import { Document, model, ObjectId, Schema } from "mongoose";

export interface productModel extends Document {
  [X: string]: any;
  error: any;
  codProduct: string;
  name: string;
  categories: string;
  size: {
    nameLetter: string;
    nameNumber: number;
    quantity: number;
    color: {
      objectid: string;
      nombre: string;}; 
  }[];
  creationdate: Date;
}

const productSchema = new Schema({
  codProduct: {
    type: String,
    required: true,
    // unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },

  categories: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },

  size: {
    type: [
      {
        nameLetter: { type: String },
        nameNumber: { type: Number },
        quantity: { type: Number },
        color: {
          objectid: { type: String },
          nombre: { type: String },
        }
      },
    ],
    default: [], // Define un valor inicial para el array como vacío
  },

  creationdate: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = model<productModel>("Products", productSchema);

export default ProductModel;
