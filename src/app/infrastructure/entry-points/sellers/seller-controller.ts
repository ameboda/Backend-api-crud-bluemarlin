import express = require("express");
import status from "http-status";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    request,
    requestParam,
    response,
} from "inversify-express-utils";


import { SavesellerUsecase} from "../../../domain/usecases/SellersCase/save-seller.usecase";
import { GetsellerUsecase} from "../../../domain/usecases/SellersCase/get-seller.usecase"; 
import { NotificationEnvelope } from "../../helper/notification/exceptions";

import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";




@controller("/Seller")
export class SellerController implements interfaces.Controller {

    constructor(
        @inject("SavesellerUsecase")
        private savesellerUsecase: SavesellerUsecase,
        @inject("GetsellerUsecase")
        private getsellerUsecase: GetsellerUsecase,
    ) { }

    @httpPost("/")
    async saveSeller(req: express.Request, res: express.Response) {
        try {
            const callUsecaseSeller = await this.savesellerUsecase.invoke(
                req.body,
            );
            if (callUsecaseSeller.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_422,
                            callUsecaseSeller.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_201,
                            callUsecaseSeller
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Customer", NOTIFICATION_STATUS_500, error)
                );
        }
    }

    @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getSellerUsecase = await this.getsellerUsecase.invoke();
            if (getSellerUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_400,
                            getSellerUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_200,
                            getSellerUsecase
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




