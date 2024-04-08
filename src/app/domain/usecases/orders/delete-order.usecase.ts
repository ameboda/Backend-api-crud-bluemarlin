import { inject, injectable } from "inversify";
import OrdersGateway from "../../models/orders/gateway/orders.gateway";



@injectable()
export class DeleteOrderUsecase {
  constructor(
    @inject("OrdersGateway") private ordersGateway: OrdersGateway
  ) { }
  async invoke(param: any): Promise<any> { // Especifica el tipo de parámetro y el tipo de retorno
    let responseOrderUseCase: any;


    // logica de borrado '
    try {
      //1. se trae la tela de la base de datos 
      let getOrderBd = await this.ordersGateway.getById(param);

      if (!getOrderBd) {
        throw new Error('Pedido no encontrado')
      }

      //2. se elimina la tela obtenida 
      await this.ordersGateway.deleteById(param);

      //3. manejar el error si no se puede eliminar 
      return true;
    } catch (error) {

      console.error('Error al eliminar el Pedido', error);
      return false

    }
  }

} 