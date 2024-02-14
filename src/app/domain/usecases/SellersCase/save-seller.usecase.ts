import { inject, injectable } from "inversify";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";
import { sellersModel } from "../../../domain/models/sellers/sellers.model"

@injectable()
export class SavesellerUsecase {
  constructor(
    @inject("SellerGateway") private sellerGateway: SellerGateway
  ) {}
   async invoke(param: sellersModel): Promise<sellersModel> {
    let responseBD: any;
    responseBD = this.sellerGateway.save(param);
    return responseBD;
  }
}
