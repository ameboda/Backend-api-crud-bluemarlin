import { id, inject, injectable } from "inversify";
import CuttingGateway from "../../models/cuttingPlanning/gateway/cutting.gateway";
import { cuttingModel } from "../../models/cuttingPlanning/cuttingPlannigModel";



@injectable()
export class GetCuttingUsecase {
  constructor(
    @inject("CuttingGateway") private cuttingGateway: CuttingGateway
  ) { }
  async invoke(): Promise<cuttingModel> {
    const responseUserCase = await this.cuttingGateway.get();
    return responseUserCase;
  }
}
