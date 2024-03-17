import { inject, injectable } from "inversify";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";
import { colorModel} from "../../models/textilecolor/color.model";



@injectable()
export class GetcolorUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) {}
  async invoke(): Promise<colorModel> {
    const responseUserCase = await this.colorGateway.get();
    return responseUserCase;
  }
} 



