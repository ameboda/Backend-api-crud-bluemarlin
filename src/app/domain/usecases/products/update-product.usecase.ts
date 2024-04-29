import { inject, injectable } from "inversify";
import { productModel } from "../../models/products/products.model";
import ProductGateway from "../../models/products/gateway/products.gateway";

@injectable()
export class UpdateProductUsecase {
  constructor(
    @inject("ProductGateway") private productGateWay: ProductGateway
  ) { }

  async invoke(param: productModel | any): Promise<productModel> {
    let responseProductUseCase: any;

    try {
      if (!param.codProductOriginal) {
        throw new Error('El código es requerido');
      }

      const responseProductByCode = await this.productGateWay.getBycode(param);
      
      if (!responseProductByCode) {
        throw new Error('No se encontró el producto por el código');
      }

      const newSizes = responseProductByCode.size.map(sizes => {
        const sizesUpdate = param.size.find(inSize => inSize.nameLetter == sizes.nameLetter);
        return sizesUpdate ? sizesUpdate : sizes;
      });

      param.size.forEach(newSize => {
        if (!newSizes.find(size => size.nameLetter == newSize.nameLetter)) {
          newSizes.push(newSize);
        }
      });

      param.size = newSizes;
      responseProductUseCase = await this.productGateWay.updateProduct(param);

      if (!responseProductUseCase.nModified) {
        responseProductUseCase.error = 'No se ha actualizado la información del producto';
      }

      return responseProductUseCase;
    } catch (err) {
      // Manejar el error 
      console.error('Error:', err.message);
      throw err; // Re-lanza el error para que lo maneje el código que llama a esta función
    }
  }
}