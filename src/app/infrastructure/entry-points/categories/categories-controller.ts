import express = require("express");
import status from "http-status";
import { inject } from "inversify";
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


import { SavecategoriesUsecase} from "../../../domain/usecases/categories/save-categories.usecase";



import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";




@controller("/Categories")
export class CategoriesController implements interfaces.Controller {

    constructor(
        @inject("SavecategoriesUsecase")
        private savecategoriesUsecase: SavecategoriesUsecase,
      
       
    ) { }


    // Crear Categories

    @httpPost("/")
    async saveCategories(req: express.Request, res: express.Response) {
        try {
            const callUsecaseCategories = await this.savecategoriesUsecase.invoke(
                req.body,
            );
            if (callUsecaseCategories.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Categories",
                            NOTIFICATION_STATUS_422,
                            callUsecaseCategories.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Categories",
                            NOTIFICATION_STATUS_201,
                            callUsecaseCategories
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Categories", NOTIFICATION_STATUS_500, error)
                );
        }
    }





    //Obtener categoria

    //Consulta  Categories 

    //Actualizacion Categories

    //Delete Categoria 
 
    //consulta EMAIL .  



   


}










