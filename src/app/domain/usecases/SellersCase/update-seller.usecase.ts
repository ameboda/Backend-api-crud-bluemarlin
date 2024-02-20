import { inject, injectable } from "inversify";
import { sellersModel } from "../../models/sellers/sellers.model";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";

@injectable()
export class UpdateSellerUsecase {
  constructor(
    @inject("SellerGateway") private sellerGateWay: SellerGateway
  ) {}
   async invoke(param: sellersModel): Promise<sellersModel> {
    let responseSellerUseCase:any;
    if(!param.cc){
        param.cc = param.currentcc
    }
    responseSellerUseCase = await this.sellerGateWay.updateBycc(param);
    if(! responseSellerUseCase.nModified){
      responseSellerUseCase.error = 'No se ha actualizado la  informacion del vendedor';
    }
    return  responseSellerUseCase;
  }

}
