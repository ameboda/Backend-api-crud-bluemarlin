import { injectable } from "inversify";
import { sellersModel } from "../sellers.model";

@injectable()
abstract class sellersGateway {

  abstract save(obj: sellersModel): Promise<sellersModel>;
  abstract get(): Promise<sellersModel>; 
}

export default sellersGateway;


