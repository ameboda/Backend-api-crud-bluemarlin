import { injectable } from "inversify";
import product, {
    productModel,
} from "../../../domain/models/products/products.model";
import ProductGateway from "../../../domain/models/products/gateway/products.gateway";






@injectable()
export class ProductService extends ProductGateway {
  async save(obj: productModel): Promise<productModel> {
    const newProducts = new product(obj);
    let responseBd: any = null;
    try {
      responseBd = await newProducts.save();
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

async get(): Promise<productModel> {
  let getResponseBd: any = null;
  try {
    getResponseBd = await product.find().populate("Categories");
  } catch (error) {
    getResponseBd = {
      error: error,
    };
  }
  return getResponseBd;
}


// Obtener un producto por CodProd

async getBycode(codProduct: string) {
  let getBycodeResponseBd: any = null;
  try {
    getBycodeResponseBd = await product.findOne({ codProduct: { $regex : new RegExp(codProduct, "i") }});
  } catch (error) {
    getBycodeResponseBd = {
      error: error,
    };
  }
  return getBycodeResponseBd;  
}





}




