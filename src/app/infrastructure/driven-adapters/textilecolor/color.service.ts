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

//retorno de productos

// async get(): Promise<productModel> {
//   let getResponseBd: any = null;
//   try {
//     getResponseBd = await product.find().populate("Categories");
//   } catch (error) {
//     getResponseBd = {
//       error: error,
//     };
//   }
//   return getResponseBd;
// }


// async getByname(name: string) {
//   let getBycodeResponseBd: any = null;
//   try {
//     getBycodeResponseBd = await product.findOne({ codProduct: { $regex : new RegExp(name, "i") }});
//   } catch (error) {
//     getBycodeResponseBd = {
//       error: error,
//     };
//   }
//   return getBycodeResponseBd;  
// }



}


