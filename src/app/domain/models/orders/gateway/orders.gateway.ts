import {injectable} from "inversify"
import { orderModel } from "../orders.model";
import { ObjectId, Types } from "mongoose";




@injectable()
abstract class OrdersGateway{
    [x: string]: any;
    abstract save(obj: orderModel): Promise<orderModel>; 
    abstract get(): Promise<orderModel>;
    abstract getById(idOrder: Number): Promise<orderModel>;
    abstract updateById(idOrder: number, updates: Partial<orderModel>): Promise<orderModel | null>;
    abstract deleteById(idOrder: number): Promise<boolean>; 
   
    
}

export default OrdersGateway; 