import { inject, injectable } from "inversify";
import ProductGateway from "../../models/products/gateway/products.gateway";
import { productModel } from "../../models/products/products.model";


@injectable()
export class SaveproductUsecase {
  constructor(
    @inject("ProductGateway") private productGateway: ProductGateway
  ) {}

  async invoke(param: productModel): Promise<productModel> {
    let responseBD: any;
    
 
    // 1. Verificar si el producto ya existe
    const existingProduct = await this.productGateway.getBycode(param.codProduct); 
    if (existingProduct) {
      throw new Error("El código de producto ya existe");
    }



    // si el codigo no existe dejarlo guardar
    // Guardar el Producto
    responseBD = this.productGateway.save(param);
    return responseBD;

  
  }
}
