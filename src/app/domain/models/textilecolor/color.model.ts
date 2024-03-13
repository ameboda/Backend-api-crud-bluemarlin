import { Document, model, Schema } from "mongoose";

export interface colorModel extends Document {
  [X: string]: any;
  error: any;
  name: string;
  creationdate: Date;
}

const colorSchema = new Schema({
 
  nombre: {
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
