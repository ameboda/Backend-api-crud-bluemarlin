import { inject, injectable } from "inversify";
import CategoriesTextileGateway from "../../models/TextileCategory/gateway/categories.textile.gateway";
import { categoriestextileModel } from "../../models/TextileCategory/textile.category.model";
import { Types } from "mongoose";

@injectable()
export class UpdateCategoryByIdUsecase {
  constructor(@inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway) {}

  async invoke(id: Types.ObjectId, categoryData: Partial<categoriestextileModel>): Promise<categoriestextileModel> {
    const updatedCategory = await this.categoriesTextileGateway.updateById(id, categoryData);

    if (!updatedCategory) {
      throw new Error(`Categoria con ID ${id} no encontrado`);
    }

    return updatedCategory;
  }
}