import { inject, injectable } from "inversify";
import { productModel } from "../../models/products/products.model";
import ProductGateway from "../../models/products/gateway/products.gateway";

@injectable()
export class GetproductBynameUsecase {
  constructor(
    @inject("ProductGateway") private productGateway: ProductGateway
  ) {}
   async invoke(name: string): Promise<productModel> {
    let responseProductUseCase:any;
    responseProductUseCase = await this.productGateway.getBycode(name);
    if(!responseProductUseCase){
      responseProductUseCase = {
        error: `No se ha encontrado registro del producto con el codigo : ${name}`
      }
    }

    return responseProductUseCase;

  }
}