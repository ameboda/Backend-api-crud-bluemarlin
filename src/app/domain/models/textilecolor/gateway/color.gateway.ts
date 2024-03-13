import {injectable} from "inversify"
import { colorModel } from "../color.model"



@injectable()
abstract class ColorGateway{

    abstract save(obj: colorModel): Promise<colorModel>; 
    // abstract get(): Promise<productModel>;
    // abstract getByname(name: String): Promise<productModel>; 
   
}

export default ColorGateway ; 