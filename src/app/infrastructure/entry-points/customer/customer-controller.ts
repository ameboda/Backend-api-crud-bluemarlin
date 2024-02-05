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
    request,
    requestParam,
    response,
} from "inversify-express-utils";
import { SaveCustomerUsecase } from "../../../domain/usecases/customer/save-customer.usecase";
import { GetCustomerUsecase } from "../../../domain/usecases/customer/get-customer.usecase";
// import { GetBrandsByIdUsecase } from "../../../domain/usecases/brands/get-brands-by-id.usecase";
// import { DeleteBrandsUsecase } from "../../../domain/usecases/brands/delete-brands.usecase";
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
        // @inject("GetBrandsByIdUsecase")
        // private GetBrandsByIdUsecase: GetBrandsByIdUsecase,
        // @inject("DeleteBrandsUsecase")
        // private DeleteBrandsUsecase: DeleteBrandsUsecase,
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


    @httpPut("/:nit")
    async updateBrands(
        @requestParam("nit") currentNit: string,
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        try {
            // const component = await this.GetBrandsByIdUsecase.invoke(id);
            const param = req.body;
            const paramsAndCurrentNit = { currentNit, ...param };
            // if (!component.length) {
            //     res
            //         .status(status.OK)
            //         .send(
            //             NotificationEnvelope.build(
            //                 "Brands",
            //                 NOTIFICATION_STATUS_404,
            //                 component.error
            //             )
            //         );
            // } else {
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
            // }
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



    // @httpGet("/:id")
    // async getBrandsById(
    //     @requestParam("id") id: string,
    //     @response() res: express.Response
    // ) {
    //     try {
    //         const GetBrandsByIdUsecase = await this.GetBrandsByIdUsecase.invoke(id);
    //         if (GetBrandsByIdUsecase.error) {
    //             res
    //                 .status(status.OK)
    //                 .send(
    //                     NotificationEnvelope.build(
    //                         "Brand",
    //                         NOTIFICATION_STATUS_404,
    //                         GetBrandsByIdUsecase.error
    //                     )
    //                 );
    //         } else {
    //             res
    //                 .status(status.OK)
    //                 .send(
    //                     NotificationEnvelope.build(
    //                         "Brand",
    //                         NOTIFICATION_STATUS_200,
    //                         GetBrandsByIdUsecase
    //                     )
    //                 );
    //         }
    //     } catch (error) {
    //         res
    //             .status(status.INTERNAL_SERVER_ERROR)
    //             .send(
    //                 NotificationEnvelope.build("Brand", NOTIFICATION_STATUS_500, error)
    //             );
    //     }
    // }

    // @httpDelete("/:id")
    // async deleteBrands(
    //     @requestParam("id") id: string,
    //     @response() res: express.Response
    // ) {
    //     try {
    //         const GetBrandsUsecase = await this.DeleteBrandsUsecase.invoke(id);
    //         if (GetBrandsUsecase.error) {
    //             res
    //                 .status(status.OK)
    //                 .send(
    //                     NotificationEnvelope.build(
    //                         "Brand",
    //                         NOTIFICATION_STATUS_404,
    //                         GetBrandsUsecase.error
    //                     )
    //                 );
    //         } else {
    //             res
    //                 .status(status.OK)
    //                 .send(
    //                     NotificationEnvelope.build(
    //                         "Brand",
    //                         NOTIFICATION_STATUS_200,
    //                         GetBrandsUsecase
    //                     )
    //                 );
    //         }
    //     } catch (error) {
    //         res
    //             .status(status.INTERNAL_SERVER_ERROR)
    //             .send(
    //                 NotificationEnvelope.build("Brand", NOTIFICATION_STATUS_500, error)
    //             );
    //     }
    // }


}