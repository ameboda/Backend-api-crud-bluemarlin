import { injectable } from "inversify";
import { sellersModel } from "../sellers.model";

@injectable()
abstract class SellerGateway {
  abstract save(obj: sellersModel): Promise<sellersModel>;
  abstract get(): Promise<sellersModel>; 
  abstract getBycc(cc): Promise<sellersModel>;
}

export default SellerGateway;


