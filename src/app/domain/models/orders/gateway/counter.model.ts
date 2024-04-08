import {Document, model, Schema, Types } from "mongoose";


export interface counterModel extends Document {

id: string;
sequence_value : number; 
}




// Esquema del contador
const counterSchema = new Schema({
    id: { type: String, required: true, auto: true},
    sequence_value: { type: Number, default: 0 }
  });
  

const CounterModel= model<counterModel>("counter", counterSchema);


export default CounterModel
