import { id, inject, injectable } from "inversify";
import OrdersGateway from "../../models/orders/gateway/orders.gateway";
import { orderModel } from "../../models/orders/orders.model";



@injectable()
export class GetOrderUsecase {
  constructor(
    @inject("OrdersGateway") private ordersGateway: OrdersGateway
  ) { }
  async invoke(): Promise<orderModel> {
    const responseUserCase = await this.ordersGateway.get();
    return responseUserCase;
  }
}
