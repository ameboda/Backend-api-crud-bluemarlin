import { inject, injectable } from "inversify";
import CustomerGateway from "../../models/customer/gateway/customer.gateway";
import { ICustomerModel } from "../../models/customer/customer.model";

@injectable()
export class GetCustomerUsecase {
  constructor(
    @inject("CustomerGateway") private customerGateway: CustomerGateway
  ) {}
  async invoke(): Promise<ICustomerModel> {
    const responseUserCase = await this.customerGateway.get();
    return responseUserCase;
  }
}