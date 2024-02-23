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


import { SavesellerUsecase} from "../../../domain/usecases/SellersCase/save-seller.usecase";
import { GetsellerUsecase} from "../../../domain/usecases/SellersCase/get-seller.usecase"; 
import { GetsellerByccUsecase } from "../../../domain/usecases/SellersCase/get-seller-by-cc.usecase";
import { GetsellerBynameUsecase  } from "../../../domain/usecases/SellersCase/get-seller-by-name.usecase";
import { UpdateSellerUsecase } from "../../../domain/usecases/SellersCase/update-seller.usecase";
import { GetSellerByemailUsecase  } from "../../../domain/usecases/SellersCase/get-seller-by-email";
import { DeleteSellerUsecase  } from "../../../domain/usecases/SellersCase/delete-seller-usecase";


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
        @inject("GetsellerByccUsecase")
        private getsellerByccUsecase: GetsellerByccUsecase,
        @inject("GetsellerBynameUsecase")
        private getsellerBynameUsecase: GetsellerBynameUsecase, 
        @inject("UpdateSellerUsecase")
        private updateSellerUsecase: UpdateSellerUsecase,
        @inject("GetsellerByemailUsecase")
        private getsellerByemailUsecase: GetSellerByemailUsecase,
        @inject("DeleteSellerUsecase")
        private deletesellerUsecase : DeleteSellerUsecase
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
    async getSellerBycc(
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
                            NOTIFICATION_STATUS_200,
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


    @httpDelete("/:cc")
    async deleteBycc(
        @requestParam("cc") cc: number,
        @response() res: express.Response
    ) {
        try {
            const deleteSellerByccUsecase = await this.deletesellerUsecase.invoke(cc);
            if (deleteSellerByccUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            deleteSellerByccUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_200,
                            deleteSellerByccUsecase
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

    

    // CONSULTA NAME 


        @httpGet("/name/:name")
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
            const respondeUpdateSellername = await this.updateSellerUsecase.invoke(paramsAndCurrentname);
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

    
//consulta EMAIL .  

    @httpGet("/email/:email")
    async getSellerByemail(
        @requestParam("email") email: string,
        @response() res: express.Response
    ) {
        try {
            const getSellerByemailUsecase = await this.getsellerByemailUsecase.invoke(email);
            if (getSellerByemailUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            getSellerByemailUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_200,
                            getSellerByemailUsecase
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

    @httpPut("/:email")
    async updateSelleremail(
        @requestParam("email") currentemail: string,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            const param = req.body;
            const paramsAndCurrentemail = { currentemail, ...param };
            const respondeUpdateSelleremail = await this.updateSellerUsecase.invoke(paramsAndCurrentemail);
            if (respondeUpdateSelleremail.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_404,
                            respondeUpdateSelleremail.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Seller",
                            NOTIFICATION_STATUS_201,
                            respondeUpdateSelleremail
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


   
}










