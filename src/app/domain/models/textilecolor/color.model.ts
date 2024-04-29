import { Document, model, Schema, Types } from "mongoose";

export interface colorModel extends Document {
 
  [X: string]: any;
  error: any;
  _id: Types.ObjectId;
  name?: string;
  creationdate: Date;
}

const colorSchema = new Schema({

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