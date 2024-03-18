import { inject, injectable } from "inversify";
import { colorModel } from "../../models/textilecolor/color.model";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";
import { Types } from "mongoose";

@injectable()
export class UpdateColorByIdUsecase {
  constructor(@inject("ColorGateway") private colorGateway: ColorGateway) {}

  async invoke(id: Types.ObjectId, colorData: Partial<colorModel>): Promise<colorModel> {
    const updatedColor = await this.colorGateway.updateById(id, colorData);

    if (!updatedColor) {
      throw new Error(`Color con ID ${id} no encontrado`);
    }

    return updatedColor;
  }
}