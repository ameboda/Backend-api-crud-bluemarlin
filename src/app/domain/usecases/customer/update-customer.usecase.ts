import { inject, injectable } from "inversify";
import { ICustomerModel } from "../../models/customer/customer.model";
import CustomerGateway from "../../models/customer/gateway/customer.gateway";

@injectable()
export class UpdateCustomerUsecase {
  constructor(
    @inject("CustomerGateway") private customerGateWay: CustomerGateway
  ) {}
   async invoke(param: ICustomerModel): Promise<ICustomerModel> {
    let responseCustomerUseCase:any;
    if(!param.nit){
        param.nit = param.currentNit
    }
    responseCustomerUseCase = await this.customerGateWay.updateByNit(param);
    if(!responseCustomerUseCase.nModified){
        responseCustomerUseCase.error = 'No se ha actualizado la  informacion del cliente';
    }
    return responseCustomerUseCase;
  }
}
