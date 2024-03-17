import {injectable} from "inversify"
import { colorModel } from "../color.model"




@injectable()
abstract class ColorGateway{
    [x: string]: any;
    abstract save(obj: colorModel): Promise<colorModel>; 
    abstract get(): Promise<colorModel>;
    abstract getByname(name: String): Promise<colorModel>; 
    abstract updateById(_id: colorModel): Promise<any>;
}

export default ColorGateway ; 