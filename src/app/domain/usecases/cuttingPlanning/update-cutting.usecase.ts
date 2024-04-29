import { id, inject, injectable } from "inversify";
import CuttingGateway from "../../models/cuttingPlanning/gateway/cutting.gateway";
import { cuttingModel } from "../../models/cuttingPlanning/cuttingPlannigModel";


@injectable()
export class UpdateCuttingUsecase {
  constructor(
    @inject("CuttingGateway") private cuttingGateway: CuttingGateway
  ) { }

  async invoke(idCutting: number, updates: Partial<cuttingModel>): Promise<cuttingModel | null> {
    try {
      const updatedCutting = await this.cuttingGateway.updateById(idCutting, updates);

      if (updatedCutting) {
        return updatedCutting;
      } else {

        throw new Error(`Orden con ID ${idCutting} no encontrado`);
      }

    } catch (error) {
      console.error("Error actualizando la Orden de Corte:", error);

      throw error;
    }
  }
}
