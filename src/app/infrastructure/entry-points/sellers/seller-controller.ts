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
import { GetsellerByccUsecase } from "../../../domain/usecases/SellersCase/get-seller-by-cc.usecase";
import { GetsellerBynameUsecase } from "../../../domain/usecases/SellersCase/get-seller-by-name.usecase";


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
        @inject("GetsellerByccUsecase")
        private getsellerByccUsecase: GetsellerByccUsecase,
        @inject("GetsellerBynameUsecase")
        private getsellerBynameUsecase: GetsellerBynameUsecase, 
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
                    NotificationEnvelope.build("Seller", NOTIFICATION_STATUS_500, error)
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





    @httpGet("/:cc")
    async getSellerByNit(
        @requestParam("cc") cc: number,
        @response() res: express.Response
    ) {
        try {
            const getSellerByccUsecase = await this.getsellerByccUsecase.invoke(cc);
            if (getSellerByccUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            getSellerByccUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_200,
                            getSellerByccUsecase
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

    @httpPut("/:cc")
    async updateSeller(
        @requestParam("cc") currentcc: number,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            const param = req.body;
            const paramsAndCurrentcc = { currentcc, ...param };
            const respondeUpdateSeller = await this.savesellerUsecase.invoke(paramsAndCurrentcc);
            if (respondeUpdateSeller.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            respondeUpdateSeller.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_201,
                            respondeUpdateSeller
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build(
                        "Seller",
                        NOTIFICATION_STATUS_500,
                        error
                    )
                );
        }
    }


    // CONSULTA NAME 


        @httpGet("/:name")
    async getSellerByname(
        @requestParam("name") name: string,
        @response() res: express.Response
    ) {
        try {
            const getSellerBynameUsecase = await this.getsellerBynameUsecase.invoke(name);
            if (getSellerBynameUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            getSellerBynameUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_200,
                            getSellerBynameUsecase
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

    @httpPut("/:name")
    async updateSellerName(
        @requestParam("name") currentname: string,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            const param = req.body;
            const paramsAndCurrentname = { currentname, ...param };
            const respondeUpdateSellername = await this.savesellerUsecase.invoke(paramsAndCurrentname);
            if (respondeUpdateSellername.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            respondeUpdateSellername.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_201,
                            respondeUpdateSellername
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build(
                        "Seller",
                        NOTIFICATION_STATUS_500,
                        error
                    )
                )
        }
    }
}








