import { injectable } from "inversify";
import categories, {
    categoriesModel,
} from "../../../domain/models/categories/categories.model";
import CategoriesGateway from "../../../domain/models/categories/gateway/categories.gateway";
 import { params } from "inversify-express-utils";
import CategoriesModel from "../../../domain/models/categories/categories.model";


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
  
  // retorno de actualizacion categoria 
  async updateCategories(obj: categoriesModel) {
    let updateCategoriesResponseBd: any = null;
    try {
      const filter = { categories: obj.categories };
      updateCategoriesResponseBd = await categories.updateOne(filter, obj);
    } catch (error) {
      updateCategoriesResponseBd = {
        error: error,
      };
    }
    return updateCategoriesResponseBd;
  }

//retorno de categoria por nombre 



//si da error significa que que por estos lares esta 

}