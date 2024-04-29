import { inject, injectable } from "inversify";
import TextileInventoryGateway from "../../models/textileInventory/gateway/textile.inventory.gateway";
import { textileInventoryModel } from "../../models/textileInventory/textile.inventory.model";




@injectable()
export class GetTextileInventoryUsecase {
  constructor(
    @inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway
  ) { }
  async invoke(): Promise<textileInventoryModel> {
    const responseUserCase = await this.textileInventoryGateway.get();
    return responseUserCase;
  }
}



