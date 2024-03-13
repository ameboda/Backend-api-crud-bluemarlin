import { inject, injectable } from "inversify";
import { productModel } from "../../models/products/products.model"; 
import ProductGateway  from "../../models/products/gateway/products.gateway";

@injectable()
export class DeleteProductUsecase {
  constructor(
    @inject("ProductGateway") private productGateway: ProductGateway
  ) {}
  async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno

    
    // logica de borrado '
    try {
      //1. se trae la categoriade la base de datos 
      let product= await this.productGateway.getBycode(param);

      if(!product){
        throw new Error('Producto no encontrado ')
      }

      //2. se elimina el vendedor obtenido 
      await this.productGateway.deleteBycode(param); 

      //3. manejar el error si no se puede eliminar 
      return true ; 
    } catch (error) {

      console.error('Error al eliminar Producto', error); 
      return false 
      
    }
  }

} 