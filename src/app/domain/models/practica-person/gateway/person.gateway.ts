import { injectable } from "inversify";
import { IPersonModel } from "../person.model";

@injectable()
abstract class CustomerGateway {

  abstract save(obj: IPersonModel): Promise<IPersonModel>;
  abstract get(): Promise<IPersonModel>;
//   abstract getByCustomer(customer): Promise<ICustomerModel>;
//   abstract getByNit(nit): Promise<ICustomerModel>;
//   abstract updateByNit(obj): Promise<ICustomerModel>;
}

export default CustomerGateway;