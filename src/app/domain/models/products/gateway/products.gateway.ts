import {injectable} from "inversify"
import { productModel } from "../products.model"
import { promises } from "fs"



@injectable()
abstract class ProductGateway{

    abstract save(obj: productModel): Promise<productModel>; 
    abstract get(): Promise<productModel>;
}

export default ProductGateway