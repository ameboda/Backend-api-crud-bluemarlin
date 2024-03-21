import { injectable } from "inversify";
import { textileInventoryModel } from "../textile.inventory.model"
import { ObjectId,Types } from "mongoose";

@injectable()
abstract class TextileInventoryGateway{
    [x: string]: any;
    abstract save(obj: textileInventoryModel): Promise<textileInventoryModel>; 
    abstract get(): Promise<textileInventoryModel>;
    abstract getById(_id: Types.ObjectId): Promise<textileInventoryModel>;
    abstract getByname(name: String): Promise<textileInventoryModel>; 
    abstract deleteById(_id: Types.ObjectId): Promise<boolean>; 
    abstract updateById(_id: Types.ObjectId, inventoryData: Partial<textileInventoryModel>): Promise<textileInventoryModel>;
    
}

export default TextileInventoryGateway; 