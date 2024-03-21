import { inject, injectable } from "inversify";
import CategoriesTextileGateway from "../../models/TextileCategory/gateway/categories.textile.gateway";
import { categoriestextileModel } from "../../models/TextileCategory/textile.category.model";



@injectable()
export class GetcategoryUsecase {
  constructor(
    @inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway
  ) {}
  async invoke(): Promise<categoriestextileModel> {
    const responseUserCase = await this.categoriesTextileGateway.get();
    return responseUserCase;
  }
} 



