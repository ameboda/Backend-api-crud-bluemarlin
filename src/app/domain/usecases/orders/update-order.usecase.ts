import { inject, injectable } from "inversify";
import { orderModel } from "../../models/orders/orders.model";
import OrdersGateway from "../../models/orders/gateway/orders.gateway";

@injectable()
export class UpdateOrderUsecase {
  constructor(
    @inject("OrdersGateway") private ordersGateway: OrdersGateway
  ) {}

  async invoke(idOrder: number, updates: Partial<orderModel>): Promise<orderModel | null> {
    try { 
      const updatedOrder = await this.ordersGateway.updateById(idOrder, updates);

      if (updatedOrder) {
        return updatedOrder; 
      } else {
        
        throw new Error(`Pedido con ID ${idOrder} no encontrado`); 
      }

    } catch (error) {
      console.error("Error actualizando Pedido:", error);
    
      throw error;  
    }
  }
}