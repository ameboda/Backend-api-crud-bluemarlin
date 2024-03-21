import { inject, injectable } from "inversify";
import { categoriesModel} from "../../models/categoriesClothing/categories.model";
import CategoriesGateway from "../../models/categoriesClothing/gateway/categories.gateway";

@injectable()
export class GetCategoriesBynameUsecase {
  constructor(
    @inject("CategoriesGateway") private categoriesGateway: CategoriesGateway
  ) {}
   async invoke(categories: string): Promise<categoriesModel> {
    let responseCategoriesUseCase:any;
    responseCategoriesUseCase = await this.categoriesGateway.getByname(categories);
    if(!responseCategoriesUseCase){
        responseCategoriesUseCase = {
        error: `No se ha encontrado registro para el email ${categories}`
      }
    }
    return responseCategoriesUseCase;
  }
}