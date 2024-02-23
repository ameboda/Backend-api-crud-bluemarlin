import { injectable } from "inversify";
import { sellersModel } from "../sellers.model";

@injectable()
abstract class SellerGateway {
  abstract save(obj: sellersModel): Promise<sellersModel>;
  abstract get(): Promise<sellersModel>; 
  abstract getBycc(cc: number): Promise<sellersModel>;
  abstract updateBycc(obj): Promise<sellersModel>;
  abstract getByname(name: String): Promise<sellersModel>;
  abstract getByemail(email:String): Promise<sellersModel>; 
  abstract deleteBycc(cc: number): Promise<any>; 
}

export default SellerGateway;


