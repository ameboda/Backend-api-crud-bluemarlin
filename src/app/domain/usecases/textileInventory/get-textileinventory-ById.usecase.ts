import { inject, injectable } from "inversify";
import TextileInventoryGateway from "../../models/textileInventory/gateway/textile.inventory.gateway";
import { textileInventoryModel } from "../../models/textileInventory/textile.inventory.model";
import { Types } from "mongoose";

@injectable()
export class GetTextileInventoryByIdtUsecase {
  constructor(
    @inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway
  ) { }

  async invoke(_id: Types.ObjectId): Promise<textileInventoryModel | null> { // Note el cambio de tipo
    const textileInventory = await this.textileInventoryGateway.getById(_id);

    if (!textileInventory) {
      throw { error: `No se encontró la tela con el ID ${_id}` };
    }

    return textileInventory;
  }
}

export class DeleteTextileInventoryByIdUsecase {
  constructor(
    @inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway
  ) { }

  async invoke(_id: Types.ObjectId): Promise<boolean> {
    return await this.textileInventoryGateway.deleteById(_id);
  }
}