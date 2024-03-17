import { inject, injectable } from "inversify";
import { colorModel } from "../../models/textilecolor/color.model";
import ColorGateway from "../../models/textilecolor/gateway/color.gateway";

@injectable()
export class UpdateColorUsecase {
  constructor(
    @inject("ColorGateway") private colorGateway: ColorGateway
  ) { }

  async invoke(param: colorModel | any): Promise<colorModel> {
    try {
      // Validar si el ID está presente
      if (!param._id) {
        throw new Error('El ID es requerido para la actualización');
      }

      // Validar si existe un color con ese ID
      const existingColor = await this.colorGateway.updateById(param.id);
      if (!existingColor) {
        throw new Error('No se encontró el color con el ID proporcionado');
      }

      // Validar si el nombre del color es único 
      if (param.name) {
        const colorWithSameName = await this.colorGateway.getByname(param.name);
        if (colorWithSameName && colorWithSameName._id.toString() !== param._id) {
          throw new Error('Ya existe un color con ese nombre');
        }
      }

      // Actualizar el color
      const updatedColor = await this.colorGateway.updateById(param);
      
      if (!updatedColor) {
        throw new Error('No se pudo actualizar el color');
      }

      return updatedColor;
    } catch (err) {
      // Manejar el error 
      console.error('Error:', err.message);
      throw err; // Re-lanza el error para que lo maneje el código que llama a esta función
    }
  }
}