import { injectable } from "inversify";
import { ICustomerModel } from "../customer.model";

@injectable()
abstract class CustomerGateway {

  abstract save(obj: ICustomerModel): Promise<ICustomerModel>;
  abstract getByCustomer(customer): Promise<ICustomerModel>;
  abstract get(): Promise<ICustomerModel>;
  abstract getByNit(nit): Promise<ICustomerModel>;
  abstract updateByNit(nit: number, updates: Partial<ICustomerModel>): Promise<ICustomerModel | null>;
}

export default CustomerGateway;