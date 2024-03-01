import { Document, model, Schema } from "mongoose"; 

export interface categoriesModel extends Document {
  [x: string]: any; 
  categories: Array<{ category: string }>
}

const categoriesSchema = new Schema({ 
  categories: [{
     category:
      { type: String,
        required: true
      }, 
  }],

  dateCreate: { type: Date, default: Date.now },
})


const CategoriesModel = model<categoriesModel>("Categories", categoriesSchema); 

export default CategoriesModel;



 