import { inject, injectable } from "inversify";
import TextileInventoryGateway from "../../models/textileInventory/gateway/textile.inventory.gateway";
import { textileInventoryModel } from "../../models/textileInventory/textile.inventory.model";
import { Types } from "mongoose";

@injectable()
export class UpdateTextileInventoryByIdUsecase {
  constructor(@inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway) { }


  async invoke(id: Types.ObjectId, inventoryData: Partial<textileInventoryModel>): Promise<textileInventoryModel> {
    const updatedTextile = await this.textileInventoryGateway.updateById(id, inventoryData);

    if (!updatedTextile) {
      throw new Error(`Categoria con ID ${id} no encontrado`);
    }

    return updatedTextile;
  }
}