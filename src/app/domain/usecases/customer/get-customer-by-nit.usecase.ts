import { inject, injectable } from "inversify";

import { ICustomerModel } from "../../models/customer/customer.model";
import CustomerGateway from "../../models/customer/gateway/customer.gateway";

@injectable()
export class GetCustomerByNitUsecase {
  constructor(
    @inject("CustomerGateway") private customerGateWay: CustomerGateway
  ) {}
   async invoke(nit: number): Promise<ICustomerModel> {
    let responseCustomerUseCase:any;
    responseCustomerUseCase = await this.customerGateWay.getByNit(nit);

    if(!responseCustomerUseCase){
      responseCustomerUseCase = {
        error: `No se ha encontrado registro para la empresa con nit : ${nit}`
      }
    }

    return responseCustomerUseCase;
  }
}
