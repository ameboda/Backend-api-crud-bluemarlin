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


import { SaveCuttingUsecase } from "../../../domain/usecases/cuttingPlanning/save-cutting.usecase";
import { GetCuttingUsecase } from "../../../domain/usecases/cuttingPlanning/get-cutting.usecase";
import { GetCuttingById } from "../../../domain/usecases/cuttingPlanning/get-cuttingById.usecase";
import { UpdateCuttingUsecase } from "../../../domain/usecases/cuttingPlanning/update-cutting.usecase";
import { DeleteCuttingUsecase } from "../../../domain/usecases/cuttingPlanning/delete-cutting.usecase";

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
import { cuttingModel } from "../../../domain/models/cuttingPlanning/cuttingPlannigModel";





@controller("/Cutting")
export class CuttingController implements interfaces.Controller {

    constructor(
        @inject("SaveCuttingUsecase")
        private saveCuttingUsecase: SaveCuttingUsecase,
        @inject("GetCuttingUsecase")
        private getCuttingUsecase: GetCuttingUsecase,
        @inject("GetCuttingById")
        private getCuttingById: GetCuttingById,
        @inject("UpdateCuttingUsecase")
        private  updateCuttingUsecase:  UpdateCuttingUsecase,
        @inject("DeleteCuttingUsecase")
        private deleteCuttingUsecase: DeleteCuttingUsecase,
    ) { }


    // Crear Telas

    @httpPost("/")
    async saveCutting(req: express.Request, res: express.Response) {
        try {
            const callUsecaseCutting = await this.saveCuttingUsecase.invoke(
                req.body,
            );
            if (callUsecaseCutting.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Cutting",
                            NOTIFICATION_STATUS_422,
                            callUsecaseCutting.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Cutting",
                            NOTIFICATION_STATUS_201,
                            callUsecaseCutting
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Cutting", NOTIFICATION_STATUS_500, error)
                );
        }
    }


    // obtener listado de Corte

    @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getOrder = await this.getCuttingUsecase.invoke();
            if (getOrder.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Cutting",
                            NOTIFICATION_STATUS_400,
                            getOrder.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Cutting",
                            NOTIFICATION_STATUS_200,
                            getOrder
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Cutting", NOTIFICATION_STATUS_500, error)
                );
        }
    }

//      Obtener Orden de Corte por Id 

    @httpGet("/:idCutting")
    async getById(@requestParam("idCutting") idCutting: number, @response() res: express.Response) {
        try {
            const cutting= await this.getCuttingById.invoke(idCutting);

            if (!cutting) {
                res
                    .status(status.NOT_FOUND)
                    .send(
                        NotificationEnvelope.build(
                            "cutting",
                            NOTIFICATION_STATUS_404,
                            "Orden de corte no encontrado"
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "cutting",
                            NOTIFICATION_STATUS_200,
                            cutting
                        )
                    );
            }

        } catch (error) {
            if (error.name === "CastError") {
                res
                    .status(status.BAD_REQUEST)
                    .send(
                        NotificationEnvelope.build(
                            "cutting",
                            NOTIFICATION_STATUS_400,
                            `El ID proporcionado no existe o no es válido: ${idCutting}`
                        )
                    );
            } else {
                console.error(error.message);
                res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .send(
                        NotificationEnvelope.build(
                            "cutting",
                            NOTIFICATION_STATUS_500,
                            "Error interno del servidor"
                        )
                    );
            }
        }


    }


//  Actualizar Pedidos por Id
        
        
   @httpPut("/:idCutting")
   async updateById(
     @requestParam("idCutting") idCutting: number,
     @request() req: express.Request,
     @response() res: express.Response
   ) {
     try {
       const updatedCutting = await this.updateCuttingUsecase.invoke(idCutting, req.body as cuttingModel);
 
       if (updatedCutting) {
         return res.status(status.OK).json({
           message: "Orden de Corte modificado con éxito",
           data: updatedCutting,
         });
       } else {
         return res.status(status.NOT_FOUND).json({ 
             message: `Orden de Corte con ID ${idCutting} no encontrado`
         });
       }
     } catch (error) {
       
       return res.status(status.INTERNAL_SERVER_ERROR).json({
         status: NOTIFICATION_STATUS_500,
         message: "Error actualizando  la Orden de Corte",
         error: error.message,
       });
     }
   }

//  borrar pedidos por Id Orden de Corte

@httpDelete("/:idCutting") // Método delete del protocolo HTTP
async deleteById(
  @requestParam("idCutting") idCutting: number, 
  @response() res: express.Response
) {
  try {
    const deletedCutting = await this.deleteCuttingUsecase.invoke(idCutting);

    if (deletedCutting) {
      return res.status(status.OK).send(
        NotificationEnvelope.build(
          "Cutting",
          NOTIFICATION_STATUS_200,
          { message: "Orden de Corte borrado con éxito" }
        )
      );
    } else {
      return res.status(status.NOT_FOUND).send(
        NotificationEnvelope.build(
          "Cutting",
          NOTIFICATION_STATUS_404,
          { message: `Orden de Corte con ID ${idCutting} no encontrado` }
        )
      );
    }
  } catch (error) {
    console.error("Error borrando Orden de Corte", error);

    switch (error.message) {
      case "Orden de Corte no encontrado":
        return res.status(status.NOT_FOUND).send(
          NotificationEnvelope.build(
            "Cutting",
            NOTIFICATION_STATUS_404,
            { message: error.message }
          )
        );
      case "Error de conexión a la base de datos":
        return res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build(
            "Cutting",
            NOTIFICATION_STATUS_500,
            { message: "Error de conexión a la base de datos" }
          )
        );
      default:
        return res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build(
            "Cutting",
            NOTIFICATION_STATUS_500,
            { message: "Error borrando  Orden de Corte" }
          )
        );
    }
  }

}

}







