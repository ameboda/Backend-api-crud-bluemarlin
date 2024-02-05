import { inject, injectable } from "inversify";
import CustomerGateway from "../../models/customer/gateway/customer.gateway";
import { ICustomerModel } from "../../../domain/models/customer/customer.model"

@injectable()
export class SaveCustomerUsecase {
  constructor(
    @inject("CustomerGateway") private customerGateway: CustomerGateway
  ) {}
   async invoke(param: ICustomerModel): Promise<ICustomerModel> {
    let responseBD: any;
    let responseUserCase: any;
    // let responseBrand = await this.brandsGateway.getByBrand(param.brand);

    // if(responseBrand){
    //   responseUserCase = {
    //     error: "ya existe esa marca"
    //   }
    //   return responseUserCase;
    // }else{
      responseBD = this.customerGateway.save(param);
      responseUserCase = {
        msg: "creado con exito",
      }
      return responseBD;
      
    // }
 
  }
}
