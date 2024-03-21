import { Document, model, Schema, Types } from "mongoose"; 

export interface categoriestextileModel extends Document {
    [x: string]: any;
    error: any;
    _id: Types.ObjectId; 
    name: string; 
    creationdate: Date;
  }

  const categoriesTextileSchema = new Schema({ 
    name: {
      type: String, 
      required: true
    },
    creationdate: {
      type: Date,
      default: Date.now,
    },
  });

const CategoriesTextileModel = model<categoriestextileModel >("Categories Textile", categoriesTextileSchema); 

export default CategoriesTextileModel;
