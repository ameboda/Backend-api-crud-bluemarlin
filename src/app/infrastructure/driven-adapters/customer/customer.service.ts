import { injectable } from "inversify";

import Customer, {
  ICustomerModel,
} from "../../../domain/models/customer/customer.model";
import CustomerGateway from "../../../domain/models/customer/gateway/customer.gateway";

@injectable()
export class CustomerService extends CustomerGateway {
  async save(obj: ICustomerModel): Promise<ICustomerModel> {
    const newCustomer = new Customer(obj);
    let responseBd: any = null;
    try {
      responseBd = await newCustomer.save();
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

  async get(): Promise<ICustomerModel> {
    let getResponseBd: any = null;
    try {
      getResponseBd = await Customer.find();
    } catch (error) {
      getResponseBd = {
        error: error,
      };
    }
    return getResponseBd;
  }

  async updateByNit(nit: number, updates: Partial<ICustomerModel>) {
    let updateByNitResponseBd: any = null;
    try {
      const filter = { nit }; // Buscar por NIT
      updateByNitResponseBd = await Customer.updateOne(filter, updates);
 
    } catch (error) {
      updateByNitResponseBd = {
        error: error,
      };
    }
    return updateByNitResponseBd;
  } 


  async getByCustomer(name: string) {
    let getByNameResponseBd: any = null;
    try {
      getByNameResponseBd = await Customer.findOne({ companyName: { $regex : new RegExp(name, "i") }});
    } catch (error) {
      getByNameResponseBd = {
        error: error,
      };
    }
    return getByNameResponseBd;
  }

  async getByNit(numberNit: number) {
    let getByNitResponseBd: any = null;
    try {
      getByNitResponseBd = await Customer.findOne({ nit: numberNit });
    } catch (error) {
      getByNitResponseBd = {
        error: error,
      };
    }
    return getByNitResponseBd;
  }
}
