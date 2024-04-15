import {injectable} from "inversify"
import { cuttingModel } from "../cuttingPlannigModel";





@injectable()
abstract class CuttingGateway{
    [x: string]: any;
    abstract save(obj:cuttingModel): Promise<cuttingModel>; 
    abstract get(): Promise<cuttingModel>;
    abstract getById(idCutting:Number): Promise<cuttingModel>;
    abstract updateById(idCutting:number, updates: Partial<cuttingModel>): Promise<cuttingModel | null>;
    abstract deleteById(idCutting:number): Promise<boolean>; 
    
}

export default CuttingGateway; 