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




@controller("/login")
export class LoginController implements interfaces.Controller {

    constructor(
        @inject("LoginSellerUsecase")
        private loginSellerUsecase: LoginSellerUsecase,
     
       
    ) { }

    
//Obtener el login segun correo y contraseña del usuario  

@httpPost("/")
async login(req: express.Request, res: express.Response) {
    try {
        const callUsecaselogin = await this.loginSellerUsecase.invoke(
            req.body,
        );
        if (callUsecaselogin.error) {
            res
                .status(NOTIFICATION_STATUS_422)
                .send(
                    NotificationEnvelope.build(
                        "Login",
                        NOTIFICATION_STATUS_422,
                        callUsecaselogin.error
                    )
                );
        } else {
            res
                .status(status.CREATED)
                .send(
                    NotificationEnvelope.build(
                        "Login",
                        NOTIFICATION_STATUS_201,
                        callUsecaselogin
                    )
                );
        }
    } catch (error) {
        res
            .status(status.INTERNAL_SERVER_ERROR)
            .send(
                NotificationEnvelope.build("Login", NOTIFICATION_STATUS_500, error)
            );
    }
}

   

}










