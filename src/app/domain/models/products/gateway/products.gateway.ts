import {injectable} from "inversify"
import { productModel } from "../products.model"



@injectable()
abstract class ProductGateway{

    abstract save(obj: productModel): Promise<productModel>; 
    abstract get(): Promise<productModel>;
    abstract getBycode(codProduct: String): Promise<productModel>;
    

}

export default ProductGateway