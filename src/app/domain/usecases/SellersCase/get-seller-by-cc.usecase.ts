import { inject, injectable } from "inversify";

import { sellersModel } from "../../models/sellers/sellers.model";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";

@injectable()
export class GetsellerByccUsecase {
  constructor(
    @inject("SellerGateway") private sellerGateway: SellerGateway
  ) {}
   async invoke(cc: number): Promise<sellersModel> {
    let responsesellerUseCase:any;
    responsesellerUseCase = await this.sellerGateway.getBycc(cc);

    if(!responsesellerUseCase){
      responsesellerUseCase = {
        error: `No se ha encontrado registro del vendedor con cc : ${cc}`
      }
    }

    return responsesellerUseCase;

  }
}




