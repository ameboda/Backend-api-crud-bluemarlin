// vendrian a ser similar a los querys de my sql
import { injectable } from "inversify";
import sellers, {
    sellersModel,
} from "../../../domain/models/sellers/sellers.model";
import SellerGateway from "../../../domain/models/sellers/gateway/sellers.gateway";

@injectable()
export class SellerService extends SellerGateway{
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
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX VALIDAR VENDEDOR Y RETORNAR LA INFORMACION SEGUN LA BUSQUEDAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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


  async getBySeller(cc: number) {
    let getByccResponseBd: any = null;
    try {
      getByccResponseBd = await sellers.findOne({ cc: cc });
    } catch (error) {
      getByccResponseBd = {
        error: error,
      };
    }
    return getByccResponseBd;
  }

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


//xxxxxxxxxxxxxxxxxxxxxxxxxxx VALIDAR VENDEDOR Y RETORNAR LA INFORMACION SEGUN LA BUSQUEDA DE NAMEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


  async updateByname(obj: sellersModel) {
    let updateBynameResponseBd: any = null;
    try {
      const filter = { name: obj.currentname };
      updateBynameResponseBd = await sellers.updateOne(filter, obj);
    } catch (error) {
      updateBynameResponseBd = {
        error: error,
      };
    }
    return updateBynameResponseBd;
  }


  async getBySellername(name: string) {
    let getBynameResponseBd: any = null;
    try {
      getBynameResponseBd = await sellers.findOne({ name: name });
    } catch (error) {
      getBynameResponseBd = {
        error: error,
      };
    }
    return getBynameResponseBd;
  }

  async getByname(name: string) {
    let getBynameResponseBd: any = null;
    try {
      getBynameResponseBd = await sellers.findOne({ name: name });
    } catch (error) {
      getBynameResponseBd = {
        error: error,
      };
    }
    return getBynameResponseBd;
  }
}


