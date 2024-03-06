// import { inject, injectable } from "inversify";
// import { categoriesModel } from "../../models/categories/categories.model"; 
// import CategoriesGateway from "../../models/categories/gateway/categories.gateway";

// interface DeleteCategoriesResult {  // Define una interfaz clara
//   success: boolean;
//   error?: string; // Para manejar posibles errores
// }  

// @injectable()
// export class DeleteCategoriesUsecase {
//   constructor(
//     @inject("CategoriesGateway") private categoriesGateway: CategoriesGateway
//   ) {}

//   async invoke(param: string): Promise<DeleteCategoriesResult> {
//     try {
//       const category: categoriesModel | null = await this.categoriesGateway.getByname(param); // Usa el modelo

//       if (!category) {
//         return { success: false, error: 'Categoria no encontrada' }; // Retorna un objeto con la estructura adecuada
//       }

//       await this.categoriesGateway.deleteCategoryByName(param);
//       return { success: true };

//     } catch (error) {
//       console.error('Error al eliminar la categoria', error); 
//       return { success: false, error: error.message }; // Manejo de errores 
//     }
//   }
// } 

