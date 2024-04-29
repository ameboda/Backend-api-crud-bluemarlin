import { inject, injectable } from "inversify";
import { productModel } from "../../models/products/products.model"; 
import ProductGateway  from "../../models/products/gateway/products.gateway";

@injectable()
export class DeleteProductUsecase {
  constructor(
    @inject("ProductGateway") private productGateway: ProductGateway
  ) {}

  async invoke(codProduct: string): Promise<boolean> { 
    try {
      const wasDeleted = await this.productGateway.deleteByCode(codProduct);
      return wasDeleted; 

    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error; 
    }
  } 
} 