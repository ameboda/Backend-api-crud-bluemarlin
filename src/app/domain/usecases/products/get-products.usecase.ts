import { inject, injectable } from "inversify";
import ProductGateway from "../../models/products/gateway/products.gateway";
import { productModel } from "../../models/products/products.model";



@injectable()
export class GetproductUsecase {
  constructor(
    @inject("ProductGateway") private productGateway: ProductGateway
  ) { }
  async invoke(): Promise<productModel> {
    const responseUserCase = await this.productGateway.get();
    return responseUserCase;
  }
}


