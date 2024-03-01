import { injectable } from "inversify";
import { categoriesModel } from "../categories.model";

@injectable()
abstract class CategoriesGateway {

  abstract save(obj: categoriesModel): Promise<categoriesModel>;
 
}

export default CategoriesGateway ;
