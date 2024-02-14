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

}