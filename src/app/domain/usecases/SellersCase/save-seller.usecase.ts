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
    let responseSellerUsecase:any; 
    let responsegetSellercc= await this.sellerGateway.getBycc(param.cc); 
    let responsegetSellereemail= await this.sellerGateway.getByemail(param.email); 

    //  validacion numero cedula
    if(responsegetSellercc){
      responseSellerUsecase= {
        error: 'ya existe este numero de cedula'
      }
      return responseSellerUsecase; 

      //validacion por correo 
   
      
    }else if(responsegetSellereemail){
      responseSellerUsecase={
        error: 'ya existe este correo'
      }
      return responseSellerUsecase; 
      //guardar usuario
    }else{
      responseBD= this.sellerGateway.save(param); 
      return responseBD; 
    }

  }
}
