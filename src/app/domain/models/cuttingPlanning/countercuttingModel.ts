import {Document, model, Schema} from "mongoose";


export interface countercuttingModel extends Document {

id: string;
sequence_value : number; 
}




// Esquema del contador
const countercuttingSchema = new Schema({
    id: { type: String, required: true, auto: true},
    sequence_value: { type: Number, default: 0 }
  });
  

const CountercuttingModel= model<countercuttingModel>("counterCutting", countercuttingSchema);



export default CountercuttingModel; 
