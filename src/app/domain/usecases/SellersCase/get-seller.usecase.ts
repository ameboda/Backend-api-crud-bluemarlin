import { inject, injectable } from "inversify";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";
import { sellersModel } from "../../models/sellers/sellers.model"

@injectable()
export class GetsellerUsecase {
  constructor(
    @inject("SellerGateway") private sellerGateway: SellerGateway
  ) {}
  async invoke(): Promise<sellersModel> {
    const responseUserCase = await this.sellerGateway.get();
    return responseUserCase;
  }
} 