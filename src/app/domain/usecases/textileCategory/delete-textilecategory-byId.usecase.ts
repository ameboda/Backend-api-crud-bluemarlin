import { inject, injectable } from "inversify";
import CategoriesTextileGateway from "../../models/TextileCategory/gateway/categories.textile.gateway";


@injectable()
export class DeleteCategoryUsecase {
  constructor(
    @inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway
  ) {}
  async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
    let responseCategoryUseCase: any;

    
    // logica de borrado '
    try {
      //1. se trae el de la base de datos 
      let category= await this.categoriesTextileGateway.getById(param);

      if(!category){
        throw new Error('categoria no encontrada')
      }

      //2. se elimina el categoria obtenido 
      await this.categoriesTextileGateway.deleteById(param); 

      //3. manejar el error si no se puede eliminar 
      return true ; 
    } catch (error) {

      console.error('Error al eliminar Categoria', error); 
      return false 
      
    }
  }

} 