import { inject, injectable } from "inversify";
import { categoriesModel } from "../../models/categoriesClothing/categories.model"; 
import CategoriesGateway from "../../models/categoriesClothing/gateway/categories.gateway";

@injectable()
export class DeleteCategoriesUsecase {
  constructor(
    @inject("CategoriesGateway") private categoriesGateway: CategoriesGateway
  ) {}
  async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
    let responseSellerUseCase: any;

    
    // logica de borrado '
    try {
      //1. se trae la categoriade la base de datos 
      let category= await this.categoriesGateway.getByname(param);

      if(!category){
        throw new Error('categoria no encontrada')
      }

      //2. se elimina el vendedor obtenido 
      await this.categoriesGateway.deleteCategoriesByname(param); 

      //3. manejar el error si no se puede eliminar 
      return true ; 
    } catch (error) {

      console.error('Error al eliminar Categoria', error); 
      return false 
      
    }
  }

} 

