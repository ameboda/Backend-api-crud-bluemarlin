import { injectable } from "inversify";
import categories, {
    categoriesModel,
} from "../../../domain/models/categories/categories.model";
import CategoriesGateway from "../../../domain/models/categories/gateway/categories.gateway";
// import { params } from "inversify-express-utils";


@injectable()
export class CategoriesService extends CategoriesGateway {
  async save(obj: categoriesModel): Promise<categoriesModel> {
    const newCategories = new categories(obj);
    let responseBd: any = null;
    try {
      responseBd = await newCategories.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors: any = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        responseBd = {
          error: errors,
        };
      }
    }
    return responseBd;
  }
}