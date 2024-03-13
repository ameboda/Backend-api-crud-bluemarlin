import { inject, injectable } from "inversify";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";
import {colorModel} from "../../models/textilecolor/color.model";


@injectable()
export class SavecolorUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) {}

  async invoke(param: colorModel): Promise<colorModel> {
    let responseBD: any;
    
 
    // 1. Verificar si el color ya existe
    // const existingColor = await this.colorGateway.findByname(param.name); 
    // if (existingColor) {
    //   throw new Error("El código de producto ya existe");
    // }



    // si el codigo no existe dejarlo guardar
    // Guardar el Producto
    responseBD = this.colorGateway.save(param);
    return responseBD;

  
  }
}
