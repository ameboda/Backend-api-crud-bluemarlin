import { inject, injectable } from "inversify";
import TextileInventoryGateway from "../../models/textileInventory/gateway/textile.inventory.gateway";



@injectable()
export class DeleteTextileInventoryUsecase {
  constructor(
    @inject("TextileInventoryGateway") private textileInventoryGateway: TextileInventoryGateway
  ) { }
  async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
    let responseTextileInventoryUseCase: any;


    // logica de borrado '
    try {
      //1. se trae la tela de la base de datos 
      let inventoryTextile = await this.textileInventoryGateway.getById(param);

      if (!inventoryTextile) {
        throw new Error('tela no encontrada')
      }

      //2. se elimina la tela obtenida 
      await this.textileInventoryGateway.deleteById(param);

      //3. manejar el error si no se puede eliminar 
      return true;
    } catch (error) {

      console.error('Error al eliminar la Tela', error);
      return false

    }
  }

} 