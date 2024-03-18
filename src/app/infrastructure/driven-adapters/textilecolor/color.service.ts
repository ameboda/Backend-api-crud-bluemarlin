import { injectable } from "inversify";
import color, {
    colorModel,
} from "../../../domain/models/textilecolor/color.model";
import ColorGateway from "../../../domain/models/textilecolor/gateway/color.gateway";
import { ObjectId, Types } from "mongoose";
import ColorModel from "../../../domain/models/textilecolor/color.model";







@injectable()
export class ColorService extends ColorGateway {
  async save(obj: colorModel): Promise<colorModel> {
    const newColor = new color(obj);
    let responseBd: any = null;
    try {
      responseBd = await newColor.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors: any = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        responseBd = {
          error: errors,
        };
      }
    }
    return responseBd;
  }

//retorno de colores

async get(): Promise<colorModel> {
  let getResponseBd: any = null;
  try {
    getResponseBd = await color.find(); 
  } catch (error) {
    getResponseBd = {
      error: error,
    };
  }
  return getResponseBd;
}


// Get name for color

async getByname(name: string) {
  let getBynameResponseBd: any = null;
  try {
    getBynameResponseBd = await color.findOne({ name: { $regex : new RegExp(name, "i") }});
  } catch (error) {
    getBynameResponseBd = {
      error: error,
    };
  }
  return getBynameResponseBd;  
}


// Update color by Id 

async updateById(id: Types.ObjectId, colorData: Partial<colorModel>): Promise<colorModel> {
  return await ColorModel.findByIdAndUpdate(id, colorData, { new: true });
}


//Delete By Id

 async getById(_id: Types.ObjectId): Promise<colorModel> {
  return await ColorModel.findById(_id);
}
 async deleteById(_id: Types.ObjectId): Promise<boolean> {
  try {
    await ColorModel.deleteOne({ _id });
    return true;
  } catch (error) {
    console.error("Error eliminando color: ", error);
    return false;
  }
}

}


