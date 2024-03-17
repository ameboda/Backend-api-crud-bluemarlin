import { Document, model, Schema, Types } from "mongoose";

export interface colorModel extends Document {
 
  [X: string]: any;
  _id: Types.ObjectId;
  error: any;
  name?: string;
  creationdate: Date;
}

const colorSchema = new Schema({

  _id: {
    type: Schema.Types.ObjectId,
    required: true},
  name: {
    type: String,
    required: true,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
});

const ColorModel = model<colorModel>("colors", colorSchema);

export default ColorModel;