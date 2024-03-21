import { inject, injectable } from "inversify";
import TextileInventoryGateway from "../../models/textileInventory/gateway/textile.inventory.gateway";
import { textileInventoryModel } from "../../models/textileInventory/textile.inventory.model";


@injectable()
export class GetTextileInventoryBynameUsecase {
  constructor(
    @inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway
  ) { }
  async invoke(name: string): Promise<textileInventoryModel> {
    let responseTextileInventoryUseCase: any;
    responseTextileInventoryUseCase = await this.textileInventoryGateway.getByname(name);
    if (!responseTextileInventoryUseCase) {
      responseTextileInventoryUseCase = {
        error: `No se ha encontrado registro de la Tela con el nombre : ${name}`
      }
    }

    return responseTextileInventoryUseCase;

  }
}


