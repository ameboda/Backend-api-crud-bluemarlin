import { inject, injectable } from "inversify";

import { colorModel} from "../../models/textilecolor/color.model";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";
import { ObjectId, Types } from "mongoose";

@injectable()
export class GetColorByIdtUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) {}

  async invoke(_id: Types.ObjectId): Promise<colorModel> {
    const color = await this.colorGateway.getById(_id);

    if (!color) {
      throw { error: `No se encontró el color con el ID ${_id}` };
    }

    return color;
  }
}

export class DeleteColorByIdUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) {}

  async invoke(_id: Types.ObjectId): Promise<boolean> {
    return await this.colorGateway.deleteById(_id);
  }
}