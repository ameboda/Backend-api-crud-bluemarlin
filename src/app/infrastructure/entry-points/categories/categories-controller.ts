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
import { UpdateCategoriesUsecase } from "../../../domain/usecases/categories/update-categories.usecase";
import { GetcategoriesUsecase } from "../../../domain/usecases/categories/get-categories.usecase"
import {GetCategoriesBynameUsecase} from "../../../domain/usecases/categories/get-categories-by-name"


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
        @inject("UpdateCategoriesUsecase")
        private updateCategoriesUsecase: UpdateCategoriesUsecase,
        @inject("GetcategoriesUsecase")
        private getcategoriesUsecase: GetcategoriesUsecase,
        @inject("GetCategoriesBynameUsecase")
        private getCategoriesBynameUsecase: GetCategoriesBynameUsecase,
       
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

     @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getCategoriesUsecase = await this.getcategoriesUsecase.invoke();
            if (getCategoriesUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Categories",
                            NOTIFICATION_STATUS_400,
                            getCategoriesUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Categories",
                            NOTIFICATION_STATUS_200,
                            getCategoriesUsecase
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

     // CONSULTA CATEGORIA POR NAME 


     @httpGet("/categories/:categories")
     async getCategoriesByname(
         @requestParam("categories") categories: string,
         @response() res: express.Response
     ) {
         try {
             const getCategoriesBynameUsecase = await this.getCategoriesBynameUsecase.invoke(categories);
             if (getCategoriesBynameUsecase.error) {
                 res
                     .status(status.OK)
                     .send(
                         NotificationEnvelope.build(
                             "Categories",
                             NOTIFICATION_STATUS_404,
                             getCategoriesBynameUsecase.error
                         )
                     );
             } else {
                 res
                     .status(status.OK)
                     .send(
                         NotificationEnvelope.build(
                             "Categories",
                             NOTIFICATION_STATUS_200,
                             getCategoriesBynameUsecase
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


       //Actualizacion Categories

    @httpPut("/") 
    async updateCategories(
        @requestParam("categories") categories: string,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            const param = req.body;
            const paramsAndcategories = { categories, ...param };
            const respondeUpdateCategories= await this.updateCategoriesUsecase.invoke(paramsAndcategories);
            if (respondeUpdateCategories.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Categories",
                            NOTIFICATION_STATUS_404,
                            respondeUpdateCategories.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Categories",
                            NOTIFICATION_STATUS_200,
                            respondeUpdateCategories
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build(
                        "Categories",
                        NOTIFICATION_STATUS_500,
                        error
                    )
                );
        }
    }





   

    //Consulta  Categories 

    

    //Delete Categoria 
 
    //consulta EMAIL .  



   


}










