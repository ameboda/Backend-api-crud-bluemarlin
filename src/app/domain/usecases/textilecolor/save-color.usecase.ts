import { inject, injectable } from "inversify";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";
import { colorModel } from "../../models/textilecolor/color.model";

@injectable()
export class SavecolorUsecase {
    constructor(
        @inject("ColorGateway") private colorGateway: ColorGateway
    ) { }

    async invoke(param: colorModel): Promise<colorModel> {
        let responseBD: any;

        try {
            // 1. Verificar si el color ya existe
            const existingColor = await this.colorGateway.getByname(param.name);
            if (existingColor) {
                throw new Error("El nombre del color ya existe");
            }

            // Guardar el color si no existe
            responseBD = await this.colorGateway.save(param);
            return responseBD;
        } catch (error) {
            // Manejar la excepción y devolver el mensaje de error
            return Promise.reject(error.message);
        }
    }
}