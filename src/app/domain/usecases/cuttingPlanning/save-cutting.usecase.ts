import { id, inject, injectable } from "inversify";
import CuttingGateway from "../../models/cuttingPlanning/gateway/cutting.gateway";
import { cuttingModel } from "../../models/cuttingPlanning/cuttingPlannigModel";

@injectable()
export class SaveCuttingUsecase {
  constructor(
    @inject("CuttingGateway") private cuttingGateway: CuttingGateway
  ) {}

  async invoke(param: cuttingModel): Promise<cuttingModel> {

    // calcular  usablepieces
    param.usablepieces= param.metersdelivered-param.metersCutting; 

    //calcular promedio real
    // param.realAverage= param.metersCutting/param.cantidadTotalPrendas;

    return await this.cuttingGateway.save(param); 


  }
}

