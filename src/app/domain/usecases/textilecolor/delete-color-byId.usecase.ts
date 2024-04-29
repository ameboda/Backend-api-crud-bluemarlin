import { inject, injectable } from "inversify";
import { colorModel } from "../../models/textilecolor/color.model"; 
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";

@injectable()
export class DeleteColorUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) {}
  async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
    let responseColorUseCase: any;

    
    // logica de borrado '
    try {
      //1. se trae el de la base de datos 
      let color= await this.colorGateway.getById(param);

      if(!color){
        throw new Error('color no encontrado')
      }

      //2. se elimina el color obtenido 
      await this.colorGateway.deleteById(param); 

      //3. manejar el error si no se puede eliminar 
      return true ; 
    } catch (error) {

      console.error('Error al eliminar Color', error); 
      return false 
      
    }
  }

} 