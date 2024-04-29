import { inject, injectable } from "inversify";
import CategoriesTextileGateway from "../../models/TextileCategory/gateway/categories.textile.gateway";
import { categoriestextileModel } from "../../models/TextileCategory/textile.category.model";
import { Types } from "mongoose";

@injectable()
export class GetCategoryrByIdtUsecase {
  constructor(
    @inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway
  ) {}

  async invoke(_id: Types.ObjectId): Promise<categoriestextileModel> {
    const category = await this.categoriesTextileGateway.getById(_id);

    if (!category) {
      throw { error: `No se encontró la categria con el ID ${_id}` };
    }

    return category;
  }
}

export class DeleteCategoryByIdUsecase {
  constructor(
    @inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway
  ) { }

  async invoke(_id: Types.ObjectId): Promise<boolean> {
    return await this.categoriesTextileGateway.deleteById(_id);
  }
}