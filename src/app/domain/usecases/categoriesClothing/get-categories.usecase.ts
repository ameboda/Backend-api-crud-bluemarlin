import { inject, injectable } from "inversify";
import CategoriesGateway from "../../models/categoriesClothing/gateway/categories.gateway";
import { categoriesModel } from "../../models/categoriesClothing/categories.model"

@injectable()
export class GetcategoriesUsecase {
  constructor(
    @inject("CategoriesGateway") private categoriesGateway: CategoriesGateway
  ) {}
  async invoke(): Promise<categoriesModel> {
    const responseUserCase = await this.categoriesGateway.get();
    return responseUserCase;
  }
} 


