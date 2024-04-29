import { inject, injectable } from "inversify";
import CategoriesTextileGateway from "../../models/TextileCategory/gateway/categories.textile.gateway";
import { categoriestextileModel } from "../../models/TextileCategory/textile.category.model";

@injectable()
export class GetcategoryBynameUsecase {
  constructor(
    @inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway
  ) {}
   async invoke(name: string): Promise<categoriestextileModel> {
    let responseCategoryUseCase:any;
    responseCategoryUseCase = await this.categoriesTextileGateway.getByname(name);
    if(!responseCategoryUseCase){
      responseCategoryUseCase = {
        error: `No se ha encontrado registro de la categoria con el nombre : ${name}`
      }
    }

    return responseCategoryUseCase;

  }
}


