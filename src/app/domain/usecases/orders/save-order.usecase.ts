import { id, inject, injectable } from "inversify";
import OrdersGateway from "../../models/orders/gateway/orders.gateway";
import { orderModel } from "../../models/orders/orders.model";

@injectable()
export class SaveOrderUsecase {
  constructor(
    @inject("OrdersGateway") private ordersGateway: OrdersGateway
  ) {}
  async invoke(param: orderModel): Promise<orderModel> {

    param.iva= 19
    param.total= ((param.subtotal * param.iva) / 100)+param.subtotal;   
  
    return await this.ordersGateway.save(param);
  }
}
