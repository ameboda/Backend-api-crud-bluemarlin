import { injectable } from "inversify";
import { categoriestextileModel } from "../textile.category.model";
import { ObjectId,Types } from "mongoose";

@injectable()
abstract class CategoriesTextileGateway{
    [x: string]: any;
    abstract save(obj: categoriestextileModel): Promise<categoriestextileModel>; 
    abstract get(): Promise<categoriestextileModel>;
    abstract getById(_id: Types.ObjectId): Promise<categoriestextileModel>;
    abstract getByname(name: String): Promise<categoriestextileModel>; 
    abstract deleteById(_id: Types.ObjectId): Promise<boolean>; 
    abstract updateById(_id: Types.ObjectId, categoryData: Partial<categoriestextileModel>): Promise<categoriestextileModel>;
    
}

export default CategoriesTextileGateway ; 