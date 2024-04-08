import { inject, injectable } from "inversify";
import OrdersGateway from "../../models/orders/gateway/orders.gateway";
import { orderModel } from "../../models/orders/orders.model";


@injectable()
export class GetOrderById {
  constructor(
    @inject("OrdersGateway") private ordersGateway: OrdersGateway
  ) {}
   async invoke(idOrder: number): Promise<orderModel> {
    let responseOrderUseCase:any;
    responseOrderUseCase = await this.ordersGateway.getById(idOrder);
    if(!responseOrderUseCase){
      responseOrderUseCase = {
        error: `No se ha encontrado registro del codigo del pedido : ${idOrder}`
      }
    }

    return responseOrderUseCase;

  }
}


