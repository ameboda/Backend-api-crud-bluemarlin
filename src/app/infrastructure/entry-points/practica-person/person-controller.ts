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


import { SavePersonUsecase } from "../../../domain/usecases/practica-person/save-person.usecase";
import { GetPersonUsecase } from "../../../domain/usecases/practica-person/get-person.usecase";
import { NotificationEnvelope } from "../../helper/notification/exceptions";

import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";


@controller("/Person")
export class PersonController implements interfaces.Controller {

    constructor(
        @inject("SavePersonUsecase")
        private savePersonUsecase: SavePersonUsecase,
        @inject("GetPersonUsecase")
        private getPersonUsecase: GetPersonUsecase,
    ) { }

    @httpPost("/")
    async savePerson(req: express.Request, res: express.Response) {
        try {
            const callUsecasePerson = await this.savePersonUsecase.invoke(
                req.body,
            );
            if (callUsecasePerson.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Person",
                            NOTIFICATION_STATUS_422,
                            callUsecasePerson.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Person",
                            NOTIFICATION_STATUS_201,
                            callUsecasePerson
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
            const getPersonUsecase = await this.getPersonUsecase.invoke();
            if (getPersonUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Person",
                            NOTIFICATION_STATUS_400,
                            getPersonUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Person",
                            NOTIFICATION_STATUS_200,
                            getPersonUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Person", NOTIFICATION_STATUS_500, error)
                );
        }
    }
}





