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


 import { SaveTextileInventoryUsecase } from "../../../domain/usecases/textileInventory/save-textileinventory.usecase";
 import { GetTextileInventoryUsecase } from "../../../domain/usecases/textileInventory/get-textileinventory.usecase"; 
 import { GetTextileInventoryBynameUsecase } from "../../../domain/usecases/textileInventory/get-textileinventory-byname.usecase";
 import { UpdateTextileInventoryByIdUsecase } from "../../../domain/usecases/textileInventory/update-textileinventory.usecase";
 import { GetTextileInventoryByIdtUsecase } from "../../../domain/usecases/textileInventory/get-textileinventory-ById.usecase";
 import { DeleteTextileInventoryUsecase} from "../../../domain/usecases/textileInventory/delete-textileinventory-byId.usecase";

import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";
import { ObjectId, Types } from "mongoose";
import { textileInventoryModel } from "../../../domain/models/textileInventory/textile.inventory.model"
import TextileInventoryGateway from "../../../domain/models/textileInventory/gateway/textile.inventory.gateway";





@controller("/Inventory")
export class TextileInventoryController implements interfaces.Controller {

    constructor(
        @inject("SaveTextileInventoryUsecase")
        private saveTextileInventoryUsecase : SaveTextileInventoryUsecase ,
        @inject("GetTextileInventoryUsecase")
        private getTextileInventoryUsecase: GetTextileInventoryUsecase,
        @inject("GetTextileInventoryBynameUsecase")
        private getTextileInventoryBynameUsecase: GetTextileInventoryBynameUsecase,
        @inject("UpdateTextileInventoryByIdUsecase")
        private  updateTextileInventoryByIdUsecase:  UpdateTextileInventoryByIdUsecase,
        @inject("TextileInventoryGateway") 
        private textileInventoryGateway: TextileInventoryGateway ,
        @inject("GetTextileInventoryByIdtUsecase")
        private getTextileInventoryByIdtUsecase: GetTextileInventoryByIdtUsecase,
        @inject("DeleteTextileInventoryUsecase")
        private deleteTextileInventoryUsecase: DeleteTextileInventoryUsecase
    ) { }


    // Crear Telas

    @httpPost("/")
    async saveTextileInventory(req: express.Request, res: express.Response) {
        try {
            const callUsecaseTextileInventory = await this.saveTextileInventoryUsecase.invoke(
                req.body,
            );
            if (callUsecaseTextileInventory.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "TextileInventory",
                            NOTIFICATION_STATUS_422,
                            callUsecaseTextileInventory.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "TextileInventory",
                            NOTIFICATION_STATUS_201,
                            callUsecaseTextileInventory
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("TextileInventory", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//  obtener listado de telas 

     @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getTextileUsecase = await this.getTextileInventoryUsecase.invoke();
            if (getTextileUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "TextileInventory",
                            NOTIFICATION_STATUS_400,
                            getTextileUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "TextileInventory",
                            NOTIFICATION_STATUS_200,
                            getTextileUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("TextileInventory", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//   Obtener Telas por nombre 

    @httpGet("/inventoryTextile/:name")
    async getTextileInventoryByname(
        @requestParam("name") name: string,
        @response() res: express.Response
    ) {
        try {
            const getTextileInventoryBynameUsecase = await this.getTextileInventoryBynameUsecase.invoke(name);
            if (getTextileInventoryBynameUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "TextileInventory",
                            NOTIFICATION_STATUS_404,
                            getTextileInventoryBynameUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "TextileInventory",
                            NOTIFICATION_STATUS_200,
                            getTextileInventoryBynameUsecase 
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("TextileInventory", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//    Actualizar Telas por Id 

@httpPut("/inventory/:id/")
async updateById(
  @requestParam("id") id: string,
  @requestBody() inventoryData: Partial<textileInventoryModel>,
  @response() res: express.Response
) {
  try {
    console.log('veamos si esta shet hace algo', id)
    const objectId = new Types.ObjectId(id);
    const updateTextileInventoryUsecase= new UpdateTextileInventoryByIdUsecase(this.textileInventoryGateway); 
    const updatedTextileInventory = await updateTextileInventoryUsecase.invoke(objectId, inventoryData);

    res.status(status.OK).send(
      NotificationEnvelope.build("TextileInventory", NOTIFICATION_STATUS_200, updatedTextileInventory)
    );
  } catch (error) {
    if (error.name === "CastError") {
      res.status(status.BAD_REQUEST).send(
        NotificationEnvelope.build(
          "TextileInventory",
          NOTIFICATION_STATUS_400,
          "El ID proporcionado no es válido"
        )
      );
    } else if (error.message.includes("no encontrado")) {
      res.status(status.NOT_FOUND).send(
        NotificationEnvelope.build(
          "TextileInventory",
          NOTIFICATION_STATUS_404,
          error.message
        )
      );
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send(
        NotificationEnvelope.build("TextileInventory", NOTIFICATION_STATUS_500, error)
      );
    }
  }
}
 
//  Borrar Telas
 

@httpDelete("/:id") // Cambiar a parámetro de ruta
  async deleteById(
    @requestParam("id") id: string, // Parámetro de ruta como string
    @response() res: express.Response
  ) {
    try {
      const objectId = new Types.ObjectId(id); // Convertir a ObjectId

      const deleteResult = await this.deleteTextileInventoryUsecase.invoke(objectId);

      if (deleteResult === false) { // Simplificar la lógica del error
        res.status(status.NOT_FOUND).send(
          NotificationEnvelope.build(
            "TextileInventory",
            NOTIFICATION_STATUS_404,
            `No se encontró la tela con el ID ${id}`
          )
        );
      } else {
        res.status(status.OK).send(
          NotificationEnvelope.build(
            "TextileInventory",
            NOTIFICATION_STATUS_200,
            "Tela eliminada correctamente" // Respuesta genérica
          )
        );
      }
    } catch (error) {
      if (error.name === 'CastError') { // Manejar error de formato de ID
        res.status(status.BAD_REQUEST).send(
          NotificationEnvelope.build(
            "TextileInventory",
            NOTIFICATION_STATUS_400, // Usar un código 400
            'El ID proporcionado no es válido'
          )
        );
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build("TextileInventory", NOTIFICATION_STATUS_500, error)
        );
      }
    }
  }


}