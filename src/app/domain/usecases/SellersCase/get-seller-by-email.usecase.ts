import { inject, injectable } from "inversify";
import { sellersModel} from "../../models/sellers/sellers.model";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";

@injectable()
export class GetSellerByemailUsecase {
  constructor(
    @inject("SellerGateway") private sellerGateWay: SellerGateway
  ) {}
   async invoke(name: string): Promise<sellersModel> {
    let responseSellerUseCase:any;
    responseSellerUseCase = await this.sellerGateWay.getByemail(name);
    if(!responseSellerUseCase){
      responseSellerUseCase = {
        error: `No se ha encontrado registro para el email ${name}`
      }
    }
    return responseSellerUseCase;
  }
}
