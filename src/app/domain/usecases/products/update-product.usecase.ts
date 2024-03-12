import { inject, injectable } from "inversify";
import { productModel  } from "../../models/products/products.model";
import ProductGateway from "../../models/products/gateway/products.gateway";

@injectable()
export class UpdateProductUsecase {
    constructor(@inject("ProductGateway") private productGateway: ProductGateway) {}
  
    async invoke(obj: productModel): Promise<any> { 
      try {
        const updateResult = await this.productGateway.updateProduct(obj);
  
        //   resultados del update de Mongoose 
        if (!updateResult.acknowledged) {
          throw new Error('La actualización no se realizó'); 
        }
  
        return { message: 'Producto actualizado con éxito' } ; 
      } catch (error) {
        throw error; 
      }
    }
  }