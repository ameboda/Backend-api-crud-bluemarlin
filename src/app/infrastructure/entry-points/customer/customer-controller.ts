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
import { ICustomerModel } from "../../../domain/models/customer/customer.model";


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
  async updateByNit(
    @requestParam("nit") nit: number,
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const updatedCustomer = await this.updateCustomerUsecase.invoke(nit, req.body as ICustomerModel);

      if (updatedCustomer) {
        return res.status(status.OK).json({
          message: "Cliente modificado con éxito",
          data: updatedCustomer,
        });
      } else {
        return res.status(status.NOT_FOUND).json({ 
            message: `Cliente con NIT ${nit} no encontrado`
        });
      }
    } catch (error) {
      // Consider using a custom error handling middleware or strategy
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        status: NOTIFICATION_STATUS_500,
        message: "Error updating customer",
        error: error.message, // Consider filtering sensitive information
      });
    }
  }
}
  

    

