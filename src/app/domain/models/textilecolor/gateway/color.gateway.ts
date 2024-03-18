import {injectable} from "inversify"
import { colorModel } from "../color.model"
import { ObjectId, Types } from "mongoose";




@injectable()
abstract class ColorGateway{
    [x: string]: any;
    abstract save(obj: colorModel): Promise<colorModel>; 
    abstract get(): Promise<colorModel>;
    abstract getById(_id: Types.ObjectId): Promise<colorModel>;
    abstract getByname(name: String): Promise<colorModel>; 
    abstract deleteById(_id: Types.ObjectId): Promise<boolean>; 
    abstract updateById(_id: Types.ObjectId, colorData: Partial<colorModel>): Promise<colorModel>;
    
}

export default ColorGateway ; 