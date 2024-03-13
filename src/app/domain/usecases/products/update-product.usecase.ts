import { inject, injectable } from "inversify";
import { productModel  } from "../../models/products/products.model";
import ProductGateway from "../../models/products/gateway/products.gateway";

@injectable()
export class UpdateProductUsecase {
  constructor(
    @inject("ProductGateway") private productGateWay: ProductGateway
  ) {}
   async invoke(param: productModel): Promise<productModel> {
    let responseProductUseCase:any;
    if(!param.codProduct){
        param.codProduct = param.codProduct
    }
    responseProductUseCase = await this.productGateWay.updateProduct(param);
    if(!responseProductUseCase.nModified){
      responseProductUseCase.error = 'No se ha actualizado la  informacion del producto';
    }
    return responseProductUseCase;
  }

}