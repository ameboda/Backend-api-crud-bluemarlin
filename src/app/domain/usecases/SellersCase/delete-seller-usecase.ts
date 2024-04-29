import { inject, injectable } from "inversify";
import { sellersModel } from "../../models/sellers/sellers.model";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";
import { error } from "console";
import { EntityPropertyNotFoundError } from "typeorm";
import { Document } from 'mongoose';

@injectable()
export class DeleteSellerUsecase {
  constructor(
    @inject("SellerGateway") private sellergateway: SellerGateway
  ) {}

  async invoke(param: number): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
    let responseSellerUseCase: any;   
    // logica de borrado '
    try {
      //1. se trae el vendedor de la base de datos 
      let seller= await this.sellergateway.getBycc(param);

      if(!seller){
        throw new Error('vendedor no encontrado')
      }

      //2. se elimina el vendedor obtenido 
      await this.sellergateway.deleteBycc(param); 

      //3. manejar el error si no se puede eliminar 
      return true ; 
    } catch (error) {

      console.error('Error al eliminar al vendedor', error); 
      return false 
      
    }
  }

  }


