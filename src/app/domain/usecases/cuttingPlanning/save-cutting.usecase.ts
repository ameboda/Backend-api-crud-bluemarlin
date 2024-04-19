import { id, inject, injectable } from "inversify";
import CuttingGateway from "../../models/cuttingPlanning/gateway/cutting.gateway";
import { cuttingModel } from "../../models/cuttingPlanning/cuttingPlannigModel";

@injectable()
export class SaveCuttingUsecase {
  constructor(
    @inject("CuttingGateway") private cuttingGateway: CuttingGateway
  ) {}

  async invoke(param: cuttingModel): Promise<cuttingModel> {

    // calculate  usablepieces
    param.usablepieces= param.metersdelivered-param.metersCutting; 

    //calculate realaverage
    // param.realAverage= param.metersCutting/param.cantidadTotalPrendas;
    //organizar con capas 

    return await this.cuttingGateway.save(param); 


  }
}

