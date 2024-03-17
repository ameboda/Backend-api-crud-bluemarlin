import { injectable } from "inversify";
import color, {
    colorModel,
} from "../../../domain/models/textilecolor/color.model";
import ColorGateway from "../../../domain/models/textilecolor/gateway/color.gateway";







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

async updateById(obj: colorModel): Promise<colorModel> {
  let updateProductResponseBd: any = null;
  try {
    const filter = { id: obj._id }; 
    updateProductResponseBd = await color.updateOne(filter, obj);
  } catch (error) {
    updateProductResponseBd = {
      error: error,
    };
  }
  return updateProductResponseBd;
}

}


