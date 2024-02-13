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
    let responseCustomerUsecase: any;
    // consulto que no exista ya el nit ingresado
    let responseGetCustomer = await this.customerGateway.getByNit(param.nit);

    if(responseGetCustomer){
      responseCustomerUsecase = {
        error: "ya existe esta empresa"
      }
      return responseCustomerUsecase;
    }else{
      responseBD = this.customerGateway.save(param);
      return responseBD;
    }
  }
}
