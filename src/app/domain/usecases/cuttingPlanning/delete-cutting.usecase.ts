
import { id, inject, injectable } from "inversify";
import CuttingGateway from "../../models/cuttingPlanning/gateway/cutting.gateway";


@injectable()
export class DeleteCuttingUsecase {
    constructor(
      @inject("CuttingGateway") private cuttingGateway: CuttingGateway
    ) { }
    async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
      let responseCuttinUseCase: any;
  
  
      // logica de borrado '
      try {
        //1. se trae la tela de la base de datos 
        let getCuttingBd = await this.cuttingGateway.getById(param);
  
        if (!getCuttingBd ) {
          throw new Error('Orden de Corte no encontrado')
        }
  
        //2. se elimina la tela obtenida 
        await this.cuttingGateway.deleteById(param);
  
        //3. manejar el error si no se puede eliminar 
        return true;
      } catch (error) {
  
        console.error('Error al eliminar la Orden de Corte', error);
        return false
  
      }
    }
  
  } 