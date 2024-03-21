import { inject, injectable } from "inversify";
import TextileInventoryGateway from "../../models/textileInventory/gateway/textile.inventory.gateway";
import { textileInventoryModel } from "../../models/textileInventory/textile.inventory.model";

@injectable()
export class SaveTextileInventoryUsecase {
    constructor(
        @inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway
    ) { }

    async invoke(param: textileInventoryModel): Promise<textileInventoryModel> {
        let responseBD: any;

        try {
            // 1. Verificar si la tela en inventarioya existe
            const existingTextileInventory = await this.textileInventoryGateway.getByname(param.name);
            if (existingTextileInventory) {
                throw new Error("El nombre de la Tela ya existe");
            }

            // Guardar  si no existe la tela en inventario
            responseBD = await this.textileInventoryGateway.save(param);
            return responseBD;
        } catch (error) {
            // Manejar la excepción y devolver el mensaje de error
            return Promise.reject(error.message);
        }
    }
}