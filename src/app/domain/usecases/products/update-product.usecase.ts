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

    console.log('viendo de nuevo el param',param);



    

    try {
      if (param.codProductOriginal) {
        // param.codProduct = param.codProduct
        // llamamos el servicio por codigo para traer el producto que vamos actualizar
        const responseProductByCode = await this.productGateWay.getBycode(param);
        if (responseProductByCode) {
          // recorremos la respuesta con la propiedad de tallas para luego crear un objeto nuevo y actualizar la bd
            const newSizes = responseProductByCode.size.map(sizes => {
            const sizesUpdate = param.size.find(inSize => inSize.nameLetter == sizes.nameLetter);
            return sizesUpdate ? sizesUpdate : sizes
          });


          // si se le agrega una talla nueva, al actualizar el hace un push y la agrega a la bd

          param.size.forEach( newSize => {
            if(!newSizes.find(size => size.nameLetter == newSize.nameLetter)){
              newSizes.push(newSize);
            }
          });


          param.size = newSizes;
          responseProductUseCase = await this.productGateWay.updateProduct(param);

          if (!responseProductUseCase.nModified) {
            responseProductUseCase.error = 'No se ha actualizado la  informacion del producto';
          }
          return responseProductUseCase;
        } else {
          console.log('luego aca hacemos un return de que no se encontro el producto por ese codigo');
        }
      } else {
        console.log('aca otro return diciendo que el codigo es requerido');
      }
    } catch (error) {

    }

  }

}