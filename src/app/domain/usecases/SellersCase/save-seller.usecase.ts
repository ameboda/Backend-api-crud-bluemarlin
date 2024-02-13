import { inject, injectable } from "inversify";
import sellersGateway from "../../models/sellers/gateway/sellers.gateway";
import { sellersModel } from "../../../domain/models/sellers/sellers.model"

@injectable()
export class SavesellerUsecase {
  constructor(
    @inject("sellersGateway") private sellersGateway: sellersGateway
  ) {}
   async invoke(param: sellersModel): Promise<sellersModel> {
    let responseBD: any;
    responseBD = this.sellersGateway.save(param);
    return responseBD;
  }
}
