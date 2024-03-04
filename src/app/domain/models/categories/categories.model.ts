import { Document, model, Schema } from "mongoose"; 

export interface categoriesModel extends Document {
    [x: string]: any;
    error: any;
    categories: string; 
    
  }

  const categoriesSchema = new Schema({ 
    categories: {
      type: String, 
      required: true
    },
    dateCreate: { type: Date, default: Date.now },
  });

const CategoriesModel = model<categoriesModel>("Categories", categoriesSchema); 

export default CategoriesModel;



 