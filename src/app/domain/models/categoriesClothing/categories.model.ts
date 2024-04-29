import { Document, model, Schema, Types } from "mongoose"; 

export interface categoriesModel extends Document {
  [x: string]: any;
  error: any;
  _id: Types.ObjectId; 
  name: string; 
  creationdate: Date;
    
  }

  const categoriesSchema = new Schema({ 
    name: {
      type: String, 
      required: true
    },
    dateCreate: { type: Date, default: Date.now },
  });

const CategoriesModel = model<categoriesModel>("CategoriesProduct", categoriesSchema); 

export default CategoriesModel;



 