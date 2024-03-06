import { injectable } from "inversify";
import { categoriesModel } from "../categories.model";

@injectable()
abstract class CategoriesGateway {

  abstract save(obj: categoriesModel): Promise<categoriesModel>;
  abstract get(): Promise<categoriesModel>; 
  abstract getByname(categories: String): Promise<categoriesModel>;
  abstract updateCategories(obj: categoriesModel): Promise<categoriesModel>; 
  abstract getById(id: string): Promise<categoriesModel>; 

  // abstract deleteCategoryByName(categories: String):Promise<categoriesModel>; 

}

export default CategoriesGateway ;
