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
    requestParam,
    response,
} from "inversify-express-utils";


 import { SavecolorUsecase  } from "../../../domain/usecases/textilecolor/save-color.usecase";
 import { GetcolorUsecase } from "../../../domain/usecases/textilecolor/get-color.usecase"; 
 import { GetcolorBynameUsecase } from "../../../domain/usecases/textilecolor/get-color-byname.usecase";
 import { UpdateColorUsecase } from "../../../domain/usecases/textilecolor/update-color.usecase";


import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";





@controller("/Color")
export class ColorController implements interfaces.Controller {

    constructor(
        @inject("SavecolorUsecase")
        private savecolorUsecase: SavecolorUsecase,
        @inject("GetcolorUsecase")
        private getcolorUsecase: GetcolorUsecase,
        @inject("GetcolorBynameUsecase")
        private getcolorBynameUsecase: GetcolorBynameUsecase,
        @inject("UpdateColorUsecase")
        private updateColorUsecase: UpdateColorUsecase
       
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

   @httpPut("/id/:id") 
   async updateColor(
       @requestParam("id") _id: string,
       @request() req: express.Request,
       @response() res: express.Response
   ) {
        console.log('este mensaje id:', _id)
       try {
           const param = req.body;
           const paramsAndcolor = { _id, ...param };
           const respondeUpdateColor= await this.updateColorUsecase.invoke(paramsAndcolor);

           if (respondeUpdateColor.error) {
               res
                   .status(status.OK)
                   .send(
                       NotificationEnvelope.build(
                           "Color",
                           NOTIFICATION_STATUS_404,
                           respondeUpdateColor.error
                       )
                   );
           } else {
               res
                   .status(status.OK)
                   .send(
                       NotificationEnvelope.build(
                           "Color",
                           NOTIFICATION_STATUS_200,
                           respondeUpdateColor
                       )
                   );
           }
       } catch (error) {
           res
               .status(status.INTERNAL_SERVER_ERROR)
               .send(
                   NotificationEnvelope.build(
                       "Color",
                       NOTIFICATION_STATUS_500,
                       error
                   )
               );
       }
   }
 
//  //Delete Productos
 

//  @httpDelete("/:name")
//  async deleteProductByName(
//    @requestParam("codProduct") codProduct: string,
//    @response() res: express.Response
//  ) {
//    try {
//      const result = await this.deleteProductUsecase.invoke(codProduct);

//      if (!result) { // Maneja el caso donde no se eliminó
//        res
//          .status(status.NOT_FOUND)
//          .send(NotificationEnvelope.build("Products", NOTIFICATION_STATUS_404, 'Producto  no encontrad'));
//        return; 
//      }

//      res
//        .status(status.OK)
//        .send(NotificationEnvelope.build("Products", NOTIFICATION_STATUS_200, 'Producto eliminado exitosamente'));
//    } catch (error) {
//      res
//        .status(status.INTERNAL_SERVER_ERROR)
//        .send(NotificationEnvelope.build("Products", NOTIFICATION_STATUS_500, error));
//    }
//  }


}