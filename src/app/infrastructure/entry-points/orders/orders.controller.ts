import express = require("express");
import status from "http-status";
import { id, inject } from "inversify";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    params,
    request,
    requestBody,
    requestParam,
    response,
} from "inversify-express-utils";


import { SaveOrderUsecase } from "../../../domain/usecases/orders/save-order.usecase";
import { GetOrderUsecase } from "../../../domain/usecases/orders/get-order.usecase";
import { GetOrderById } from "../../../domain/usecases/orders/get-orderById.usecase";
import { UpdateOrderUsecase } from "../../../domain/usecases/orders/update-order.usecase";
import { DeleteOrderUsecase } from "../../../domain/usecases/orders/delete-order.usecase";

import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";
import { orderModel } from "../../../domain/models/orders/orders.model"





@controller("/Order")
export class OrderController implements interfaces.Controller {

    constructor(
        @inject("SaveOrderUsecase")
        private saveOrderUsecase: SaveOrderUsecase,
        @inject("GetOrderUsecase")
        private getOrderUsecase: GetOrderUsecase,
        @inject("GetOrderById")
        private getOrderById: GetOrderById,
        @inject("UpdateOrderUsecase")
        private  updateOrderUsecase:  UpdateOrderUsecase,
        @inject("DeleteOrderUsecase")
        private deleteOrderUsecase: DeleteOrderUsecase,
    ) { }


    // Crear Telas

    @httpPost("/")
    async saveOrder(req: express.Request, res: express.Response) {
        try {
            const callUsecaseOrder = await this.saveOrderUsecase.invoke(
                req.body,
            );
            if (callUsecaseOrder.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_422,
                            callUsecaseOrder.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_201,
                            callUsecaseOrder
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Order", NOTIFICATION_STATUS_500, error)
                );
        }
    }


    // //  obtener listado de ordenes

    @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getOrder = await this.getOrderUsecase.invoke();
            if (getOrder.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_400,
                            getOrder.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_200,
                            getOrder
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Order", NOTIFICATION_STATUS_500, error)
                );
        }
    }

    // // // Obtener pedido por Id 

    @httpGet("/:idOrder")
    async getById(@requestParam("idOrder") idOrder: number, @response() res: express.Response) {
        try {
            const order = await this.getOrderById.invoke(idOrder);

            if (!order) {
                res
                    .status(status.NOT_FOUND)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_404,
                            "Pedido no encontrado"
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_200,
                            order
                        )
                    );
            }

        } catch (error) {
            if (error.name === "CastError") {
                res
                    .status(status.BAD_REQUEST)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_400,
                            `El ID proporcionado no existe o no es válido: ${idOrder}`
                        )
                    );
            } else {
                console.error(error.message);
                res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .send(
                        NotificationEnvelope.build(
                            "Order",
                            NOTIFICATION_STATUS_500,
                            "Error interno del servidor"
                        )
                    );
            }
        }


    }


   //    Actualizar Pedidos por Id
        
        
   @httpPut("/:idOrder")
   async updateById(
     @requestParam("idOrder") idOrder: number,
     @request() req: express.Request,
     @response() res: express.Response
   ) {
     try {
       const updatedOrder = await this.updateOrderUsecase.invoke(idOrder, req.body as orderModel);
 
       if (updatedOrder) {
         return res.status(status.OK).json({
           message: "Pedido modificado con éxito",
           data: updatedOrder,
         });
       } else {
         return res.status(status.NOT_FOUND).json({ 
             message: `Pedido con ID ${idOrder} no encontrado`
         });
       }
     } catch (error) {
       
       return res.status(status.INTERNAL_SERVER_ERROR).json({
         status: NOTIFICATION_STATUS_500,
         message: "Error actualizando  Pedido",
         error: error.message, // Consider filtering sensitive information
       });
     }
   }

// borrar pedidos por IdOrder 

@httpDelete("/:idOrder") // Método delete del protocolo HTTP
async deleteById(
  @requestParam("idOrder") idOrder: number, 
  @response() res: express.Response
) {
  try {
    const deletedOrder = await this.deleteOrderUsecase.invoke(idOrder);

    if (deletedOrder) {
      return res.status(status.OK).send(
        NotificationEnvelope.build(
          "Order",
          NOTIFICATION_STATUS_200,
          { message: "Pedido borrado con éxito" }
        )
      );
    } else {
      return res.status(status.NOT_FOUND).send(
        NotificationEnvelope.build(
          "Order",
          NOTIFICATION_STATUS_404,
          { message: `Pedido con ID ${idOrder} no encontrado` }
        )
      );
    }
  } catch (error) {
    console.error("Error borrando Pedido", error);

    switch (error.message) {
      case "Pedido no encontrado":
        return res.status(status.NOT_FOUND).send(
          NotificationEnvelope.build(
            "Order",
            NOTIFICATION_STATUS_404,
            { message: error.message }
          )
        );
      case "Error de conexión a la base de datos":
        return res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build(
            "Order",
            NOTIFICATION_STATUS_500,
            { message: "Error de conexión a la base de datos" }
          )
        );
      default:
        return res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build(
            "Order",
            NOTIFICATION_STATUS_500,
            { message: "Error borrando  Pedido" }
          )
        );
    }
  }

}

}







