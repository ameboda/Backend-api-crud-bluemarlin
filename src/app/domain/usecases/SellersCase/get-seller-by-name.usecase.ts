import { inject, injectable } from "inversify";
import { sellersModel } from "../../models/sellers/sellers.model";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";

@injectable()
export class GetsellerBynameUsecase {
  constructor(
    @inject("SellerGateway") private sellerGateway: SellerGateway
  ) {}
   async invoke(name: string): Promise<sellersModel> {
    let responsesellerUseCase:any;
    responsesellerUseCase = await this.sellerGateway.getByname(name);
    if(!responsesellerUseCase){
      responsesellerUseCase = {
        error: `No se ha encontrado registro del vendedor con el nombre : ${name}`
      }
    }

    return responsesellerUseCase;

  }
}
