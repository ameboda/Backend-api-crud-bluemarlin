import { Document, model, Schema, Types } from "mongoose";


export interface textileInventoryModel extends Document {

[X: string]: any;
error: any; 
_id: Types.ObjectId;
name: string;
category: Types.ObjectId;
Width: number;
stock: number; 
creationDate: Date; 

}

const textileinventorySchema= new Schema({

    name:{
        type: String,
        required: true,

    }, 
    category:{
        type: Schema.Types.ObjectId,
        ref: "CategoriesTextile"
        
    }, 
    Width:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    }, 
    creationDate:{
        type: Date,
        default: Date.now,
    } ,
}); 


const TextileInventory = model<textileInventoryModel>('inventorytextile', textileinventorySchema);

export default TextileInventory