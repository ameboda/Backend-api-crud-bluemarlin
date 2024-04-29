import { id, inject, injectable } from "inversify";
import CuttingGateway from "../../models/cuttingPlanning/gateway/cutting.gateway";
import { cuttingModel } from "../../models/cuttingPlanning/cuttingPlannigModel";


@injectable()
export class GetCuttingById {
  constructor(
    @inject("CuttingGateway") private cuttingGateway: CuttingGateway
  ) {}
   async invoke(idCutting: number): Promise<cuttingModel> {
    let responseCuttingUseCase:any;
    responseCuttingUseCase = await this.cuttingGateway.getById(idCutting);
    if(!responseCuttingUseCase){
        responseCuttingUseCase = {
        error: `No se ha encontrado registro de la Orden de Corte con id: ${idCutting}`
      }
    }

    return responseCuttingUseCase;

  }
}


