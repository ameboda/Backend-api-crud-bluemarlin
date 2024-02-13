import { inject, injectable } from "inversify";
import { ICustomerModel } from "../../models/customer/customer.model";
import CustomerGateway from "../../models/customer/gateway/customer.gateway";

@injectable()
export class GetCustomerByNameUsecase {
  constructor(
    @inject("CustomerGateway") private customerGateWay: CustomerGateway
  ) {}
   async invoke(name: string): Promise<ICustomerModel> {
    let responseCustomerUseCase:any;
    responseCustomerUseCase = await this.customerGateWay.getByCustomer(name);
    if(!responseCustomerUseCase){
      responseCustomerUseCase = {
        error: `No se ha encontrado registro para la empresa: ${name}`
      }
    }
    return responseCustomerUseCase;
  }
}
