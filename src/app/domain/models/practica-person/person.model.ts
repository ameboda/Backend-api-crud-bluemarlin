import { Document, model, Schema } from "mongoose";

export interface IPersonModel extends Document {
  [x: string]: any;
  cc: number;
  age: number;
  name:string;
  lastname: string;
}

const PersonSchema = new Schema({
  cc: {
    type: Number,
    required: true,
  },

  age: {
    type: Number
  },

  name: {
    type: String
  },

  lastname: {
    type: String,
    required: true,
  },

  dateCreate: { type: Date, default: Date.now },
});

const PersonModel = model<IPersonModel>("Person", PersonSchema);

export default PersonModel;
