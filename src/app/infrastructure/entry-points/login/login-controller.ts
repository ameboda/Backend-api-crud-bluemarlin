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


import { LoginSellerUsecase} from "../../../domain/usecases/loginCase/login-seller.usercase";




import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";




@controller("/Login")
export class SellerController implements interfaces.Controller {

    constructor(
        @inject("LoginSellerUsecase")
        private loginSellerUsecase: LoginSellerUsecase,
     
       
    ) { }

    
//Obtener el login segun correo y contraseña del usuario  

    @httpGet("/login")
    async loginseller(
        @requestParam("email") email: any,
        @response() res: express.Response
    ) {
        try {
            const loginSellerUsecase = await this.loginSellerUsecase.invoke(email);
            if (loginSellerUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            loginSellerUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_200,
                            loginSellerUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Seller", NOTIFICATION_STATUS_500, error)
                );
        }
    }




}










