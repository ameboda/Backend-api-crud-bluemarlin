import { inject, injectable } from "inversify";
import CategoriesGateway from "../../models/categories/gateway/categories.gateway";
import { categoriesModel } from "../../../domain/models/categories/categories.model";

@injectable()
export class SavecategoriesUsecase {
  constructor(@inject("CategoriesGateway") private categoriesGateway: CategoriesGateway) {}

  async invoke(param: categoriesModel): Promise<categoriesModel> {
    let responseBD: any; 


    // Validación para ver si ya existe la categoria en la BD:
    

    // Guardar la categoría
    responseBD = this.categoriesGateway.save(param);
    return responseBD;
  }
} 