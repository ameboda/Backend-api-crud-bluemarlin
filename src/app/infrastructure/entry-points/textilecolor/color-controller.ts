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


 import { SavecolorUsecase  } from "../../../domain/usecases/textilecolor/save-color.usecase";
 import { GetcolorUsecase } from "../../../domain/usecases/textilecolor/get-color.usecase"; 
 import { GetcolorBynameUsecase } from "../../../domain/usecases/textilecolor/get-color-byname.usecase";
 import { UpdateColorByIdUsecase } from "../../../domain/usecases/textilecolor/update-color.usecase";
 import { GetColorByIdtUsecase } from "../../../domain/usecases/textilecolor/get-color-ById.usecase";
 import { DeleteColorUsecase } from "../../../domain/usecases/textilecolor/delete-color-byId.usecase";

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
import { colorModel } from "../../../domain/models/textilecolor/color.model";
import ColorGateway from "../../../domain/models/textilecolor/gateway/color.gateway";





@controller("/Color")
export class ColorController implements interfaces.Controller {

    constructor(
        @inject("SavecolorUsecase")
        private savecolorUsecase: SavecolorUsecase,
        @inject("GetcolorUsecase")
        private getcolorUsecase: GetcolorUsecase,
        @inject("GetcolorBynameUsecase")
        private getcolorBynameUsecase: GetcolorBynameUsecase,
        @inject("UpdateColorByIdUsecase")
        private updateColorByIdUsecase: UpdateColorByIdUsecase,
        @inject("ColorGateway") // Inyectar el ColorGateway
        private colorGateway: ColorGateway ,
        @inject("GetColorByIdtUsecase")
        private getColorByIdtUsecase: GetColorByIdtUsecase,
        @inject("DeleteColorUsecase")
        private deleteColorUsecase: DeleteColorUsecase
    ) { }


    // Crear Colores

    @httpPost("/")
    async saveColor(req: express.Request, res: express.Response) {
        try {
            const callUsecaseColor = await this.savecolorUsecase.invoke(
                req.body,
            );
            if (callUsecaseColor.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Color",
                            NOTIFICATION_STATUS_422,
                            callUsecaseColor.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Color",
                            NOTIFICATION_STATUS_201,
                            callUsecaseColor
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Color", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//  obtener colores 

     @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getcolorUsecase = await this.getcolorUsecase.invoke();
            if (getcolorUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Color",
                            NOTIFICATION_STATUS_400,
                            getcolorUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Color",
                            NOTIFICATION_STATUS_200,
                            getcolorUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Color", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//   Obtener color por nombre 

    @httpGet("/color/:name")
    async getcolorByname(
        @requestParam("name") name: string,
        @response() res: express.Response
    ) {
        try {
            const getColorBynameUsecase = await this.getcolorBynameUsecase.invoke(name);
            if (getColorBynameUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Color",
                            NOTIFICATION_STATUS_404,
                            getColorBynameUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Color",
                            NOTIFICATION_STATUS_200,
                            getColorBynameUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Color", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//    Update Color

@httpPut("/color/:id/")
async updateById(
  @requestParam("id") id: string,
  @requestBody() colorData: Partial<colorModel>,
  @response() res: express.Response
) {
  try {
    const objectId = new Types.ObjectId(id);
    const updateColorUsecase = new UpdateColorByIdUsecase(this.colorGateway); // Pasar el ColorGateway
    const updatedColor = await updateColorUsecase.invoke(objectId, colorData);

    res.status(status.OK).send(
      NotificationEnvelope.build("Color", NOTIFICATION_STATUS_200, updatedColor)
    );
  } catch (error) {
    if (error.name === "CastError") {
      res.status(status.BAD_REQUEST).send(
        NotificationEnvelope.build(
          "Color",
          NOTIFICATION_STATUS_400,
          "El ID proporcionado no es válido"
        )
      );
    } else if (error.message.includes("no encontrado")) {
      res.status(status.NOT_FOUND).send(
        NotificationEnvelope.build(
          "Color",
          NOTIFICATION_STATUS_404,
          error.message
        )
      );
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send(
        NotificationEnvelope.build("Color", NOTIFICATION_STATUS_500, error)
      );
    }
  }
}
 
//  //Delete Productos
 

@httpDelete("/:id") // Cambiar a parámetro de ruta
  async deleteById(
    @requestParam("id") id: string, // Parámetro de ruta como string
    @response() res: express.Response
  ) {
    try {
      const objectId = new Types.ObjectId(id); // Convertir a ObjectId

      const deleteResult = await this.deleteColorUsecase.invoke(objectId);

      if (deleteResult === false) { // Simplificar la lógica del error
        res.status(status.NOT_FOUND).send(
          NotificationEnvelope.build(
            "Color",
            NOTIFICATION_STATUS_404,
            `No se encontró el color con el ID ${id}`
          )
        );
      } else {
        res.status(status.OK).send(
          NotificationEnvelope.build(
            "Color",
            NOTIFICATION_STATUS_200,
            "Color eliminado correctamente" // Respuesta genérica
          )
        );
      }
    } catch (error) {
      if (error.name === 'CastError') { // Manejar error de formato de ID
        res.status(status.BAD_REQUEST).send(
          NotificationEnvelope.build(
            "Color",
            NOTIFICATION_STATUS_400, // Usar un código 400
            'El ID proporcionado no es válido'
          )
        );
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build("Color", NOTIFICATION_STATUS_500, error)
        );
      }
    }
  }


}