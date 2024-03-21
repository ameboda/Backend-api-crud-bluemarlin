import { inject, injectable } from "inversify";
import { categoriesModel  } from "../../models/categoriesClothing/categories.model";
import CategoriesGateway from "../../models/categoriesClothing/gateway/categories.gateway";

@injectable()
export class UpdateCategoriesUsecase {
  constructor(
    @inject("CategoriesGateway") private categoriesGateway: CategoriesGateway
  ) {}
   async invoke(param: categoriesModel): Promise<categoriesModel> {
    let responseCategoriesUseCase:any;
    if(!param.categories){
        param.categories = param.currentcategories
    }
    responseCategoriesUseCase= await this.categoriesGateway.updateCategories(param); 
    if (!responseCategoriesUseCase.nModified) {
        responseCategoriesUseCase.error = 'No se actualizó la Categoria';
    } else {
        responseCategoriesUseCase.message = 'Categoría actualizada con éxito';
    }   

    return responseCategoriesUseCase;
  }

}


// si da error la validacion  esta incorrecta en : param.categories = param.categories 