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

  async updateByNit(obj: ICustomerModel) {
    let updateByNitResponseBd: any = null;
    try {
      const filter = { nit: obj.currentNit };
      updateByNitResponseBd = await Customer.updateOne(filter, obj);
    } catch (error) {
      updateByNitResponseBd = {
        error: error,
      };
    }
    return updateByNitResponseBd;
  }


//   async getById(id: string) {
//     let getByIdResponseBd: any = null;
//     try {
//       getByIdResponseBd = await Banner.find({ _id: id });
//     } catch (error) {
//       getByIdResponseBd = {
//         error: error,
//       };
//     }
//     return getByIdResponseBd;
//   }

//   async getByState(obj: IBannerModel): Promise<IBannerModel> {
//     let getByIdResponseBd: any = null;
//     try {
//       getByIdResponseBd = await Banner.find({ state: obj.state });
//     } catch (error) {
//       getByIdResponseBd = {
//         error: error,
//       };
//     }
//     return getByIdResponseBd;
//   }

//   async updateById(obj: IBannerModel) {
//     let updateByIdResponseBd: any = null;
//     try {
//       const filter = { _id: obj.id };
//       updateByIdResponseBd = await Banner.updateOne(filter, obj);
//     } catch (error) {
//       updateByIdResponseBd = {
//         error: error,
//       };
//     }

//     return updateByIdResponseBd;
//   }

//   deleteById(id: string) {
//     const data: any = "todo";
//     return data;
//   }
}
