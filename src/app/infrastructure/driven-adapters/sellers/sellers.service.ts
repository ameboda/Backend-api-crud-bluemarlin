// vendrian a ser similar a los querys de my sql
import { injectable } from "inversify";
import sellers, {
    sellersModel,
} from "../../../domain/models/sellers/sellers.model";
import SellerGateway from "../../../domain/models/sellers/gateway/sellers.gateway";
import { params } from "inversify-express-utils";

@injectable()
export class SellerService extends SellerGateway {
  async save(obj: sellersModel): Promise<sellersModel> {
    const newSeller = new sellers(obj);
    let responseBd: any = null;
    try {
      responseBd = await newSeller.save();
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

  async get(): Promise<sellersModel> {
    let getResponseBd: any = null;
    try {
      getResponseBd = await sellers.find();
    } catch (error) {
      getResponseBd = {
        error: error,
      };
    }
    return getResponseBd;
  }
// retorno de actualizacion por cedula 
  async updateBycc(obj: sellersModel) {
    let updateByccResponseBd: any = null;
    try {
      const filter = { cc: obj.currentcc };
      updateByccResponseBd = await sellers.updateOne(filter, obj);
    } catch (error) {
      updateByccResponseBd = {
        error: error,
      };
    }
    return updateByccResponseBd;
  }

//retorno de usuario por nombre 
  async getByname(name: string) {
    let getBynameResponseBd: any = null;
    try {
      getBynameResponseBd = await sellers.findOne({ name: { $regex : new RegExp(name, "i") }});
    } catch (error) {
      getBynameResponseBd = {
        error: error,
      };
    }
    return getBynameResponseBd;
  }
//retorno de usuario por numero de cedula 
  async getBycc(numbercc: number) {
    let getByccResponseBd: any = null;
    try {
      getByccResponseBd = await sellers.findOne({ cc: numbercc });
    } catch (error) {
      getByccResponseBd = {
        error: error,
      };
    }
    return getByccResponseBd;
  }

  // retorno de usuario por email 
  async getByemail(email: string) {
    let getByemailResponseBd: any = null;
    try {
      getByemailResponseBd = await sellers.findOne({ email: { $regex : new RegExp(email, "i") }});
    } catch (error) {
      getByemailResponseBd = {
        error: error,
      };
    }
    return getByemailResponseBd;
  } 


  // borrar vendedor con metodo delete 
  async deleteBycc(numbercc: number) {
    let deleteccResponseBd: any = null;
    try {
      deleteccResponseBd = await sellers.deleteOne({ cc: numbercc });
    } catch (error) {
      deleteccResponseBd = {
        error: error,
      };
    }
    return deleteccResponseBd;
  }

}




