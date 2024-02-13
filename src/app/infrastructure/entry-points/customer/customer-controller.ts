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
import { SaveCustomerUsecase } from "../../../domain/usecases/customer/save-customer.usecase";
import { GetCustomerUsecase } from "../../../domain/usecases/customer/get-customer.usecase";
import { GetCustomerByNameUsecase } from "../../../domain/usecases/customer/get-customer-by-name.usecase";
import { GetCustomerByNitUsecase } from "../../../domain/usecases/customer/get-customer-by-nit.usecase";
import { UpdateCustomerUsecase } from "../../../domain/usecases/customer/update-customer.usecase";


import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";


@controller("/customer")
export class CustomerController implements interfaces.Controller {

    constructor(
        @inject("SaveCustomerUsecase")
        private saveCustomerUsecase: SaveCustomerUsecase,
        @inject("GetCustomerUsecase")
        private getCustomerUsecase: GetCustomerUsecase,
        @inject("GetCustomerByNameUsecase")
        private getCustomerByNameUsecase: GetCustomerByNameUsecase,
        @inject("GetCustomerByNitUsecase")
        private getCustomerByNitUsecase: GetCustomerByNitUsecase,
        @inject("UpdateCustomerUsecase")
        private updateCustomerUsecase: UpdateCustomerUsecase,
    ) { }

    @httpPost("/")
    async saveCustomer(req: express.Request, res: express.Response) {
        try {
            const callUsecaseCustomer = await this.saveCustomerUsecase.invoke(
                req.body,
            );
            if (callUsecaseCustomer.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_422,
                            callUsecaseCustomer.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_201,
                            callUsecaseCustomer
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
            const getCustomerUsecase = await this.getCustomerUsecase.invoke();
            if (getCustomerUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_400,
                            getCustomerUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_200,
                            getCustomerUsecase
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

    @httpGet("/:name")
    async getCustomerByName(
        @requestParam("name") name: string,
        @response() res: express.Response
    ) {
        try {
            const getCustomerByNameUsecase = await this.getCustomerByNameUsecase.invoke(name);
            if (getCustomerByNameUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_404,
                            getCustomerByNameUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_200,
                            getCustomerByNameUsecase
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

    @httpGet("/nit/:nit")
    async getCustomerByNit(
        @requestParam("nit") nit: number,
        @response() res: express.Response
    ) {
        try {
            const getCustomerByNitUsecase = await this.getCustomerByNitUsecase.invoke(nit);
            if (getCustomerByNitUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_404,
                            getCustomerByNitUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_200,
                            getCustomerByNitUsecase
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

    @httpPut("/:nit")
    async updateCustomer(
        @requestParam("nit") currentNit: string,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            const param = req.body;
            const paramsAndCurrentNit = { currentNit, ...param };
            const respondeUpdateCustomer = await this.updateCustomerUsecase.invoke(paramsAndCurrentNit);
            if (respondeUpdateCustomer.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_404,
                            respondeUpdateCustomer.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Customer",
                            NOTIFICATION_STATUS_201,
                            respondeUpdateCustomer
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build(
                        "Customer",
                        NOTIFICATION_STATUS_500,
                        error
                    )
                );
        }
    }

}