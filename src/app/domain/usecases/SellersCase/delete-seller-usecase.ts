import { inject, injectable } from "inversify";
import { sellersModel } from "../../models/sellers/sellers.model";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";

@injectable()
export class DeleteSellerUsecase {
  constructor(
    @inject("SellerGateway") private sellergateway: SellerGateway
  ) {}

  async invoke(param): Promise<any> {
    let responseSellerUseCase: any;
console.log(param , 'PARAMETRO')

    return null

    
    // Verificar si se proporcionó 'cc' o se debe usar 'currentcc'
    if (!param.cc) {
      param.cc = param.currentcc;
    }

    // Lógica de borrado
    try {
      const deletionResult = await this.sellergateway.deleteBycc(param.cc);

      if (deletionResult.deletedCount === 0) {
        responseSellerUseCase = { error: 'Vendedor no encontrado' };
      } else {
        responseSellerUseCase = deletionResult; 
        
      }
    } catch (error) {
      responseSellerUseCase = { error: 'Error al eliminar el vendedor' }; 
    }

    return responseSellerUseCase;
  }

  }


