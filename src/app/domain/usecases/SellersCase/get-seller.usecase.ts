import { inject, injectable } from "inversify";
import sellersGateway from "../../models/sellers/gateway/sellers.gateway";
import { sellersModel } from "../../models/sellers/sellers.model"

@injectable()
export class GetsellerUsecase {
  constructor(
    @inject("PersonGateway") private sellersGateway: sellersGateway
  ) {}
  async invoke(): Promise<sellersModel> {
    const responseUserCase = await this.sellersGateway.get();
    return responseUserCase;
  }
} 