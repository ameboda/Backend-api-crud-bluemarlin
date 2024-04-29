import { inject, injectable } from "inversify";
import { colorModel } from "../../models/textilecolor/color.model";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";

@injectable()
export class GetcolorBynameUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) {}
   async invoke(name: string): Promise<colorModel> {
    let responseColorUseCase:any;
    responseColorUseCase = await this.colorGateway.getByname(name);
    if(!responseColorUseCase){
        responseColorUseCase = {
        error: `No se ha encontrado registro del Color con el nombre : ${name}`
      }
    }

    return responseColorUseCase;

  }
}

