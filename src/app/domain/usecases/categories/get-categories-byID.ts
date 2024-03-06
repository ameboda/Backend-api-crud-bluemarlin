import { inject, injectable } from "inversify";
import { categoriesModel } from "../../models/categories/categories.model";
import CategoriesGateway from "../../models/categories/gateway/categories.gateway";

@injectable()
export class GetcategoriesByIDUsecase {
  constructor(
    @inject("CategoriesGateway") private categoriesGateway: CategoriesGateway
  ) {}

  //  obtener categoría por ID
  async invoke(categoryId: string): Promise<categoriesModel> { 
    try {
      const category = await this.categoriesGateway.getById(categoryId);

      if (!category) {
        throw new Error('Categoria no encontrada'); 
      }

      return category;

    } catch (error) {
      // Maneja los errores adecuadamente
      console.error('Error obteniendo categoria', error);
      throw error; // Relanza el error para su manejo en niveles superiores
    }
  }
}