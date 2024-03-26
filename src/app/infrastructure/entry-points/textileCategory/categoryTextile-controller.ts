import express = require("express");
import status from "http-status";
import { id, inject } from "inversify";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    params,
    request,
    requestBody,
    requestParam,
    response,
} from "inversify-express-utils";


 import { SavecategoryUsecase  } from "../../../domain/usecases/textileCategory/save-textilecategory.usecase";
 import { GetcategoryUsecase } from "../../../domain/usecases/textileCategory/get-textilecategory.usecase"; 
 import { GetcategoryBynameUsecase } from "../../../domain/usecases/textileCategory/get-textilecategory-byname.usecase";
 import { UpdateCategoryByIdUsecase } from "../../../domain/usecases/textileCategory/update-textilecategory.usecase";
 import { GetCategoryrByIdtUsecase } from "../../../domain/usecases/textileCategory/get-textilecategory-ById.usecase";
 import { DeleteCategoryUsecase } from "../../../domain/usecases/textileCategory/delete-textilecategory-byId.usecase";

import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";
import { ObjectId, Types } from "mongoose";
import { categoriestextileModel } from "../../../domain/models/TextileCategory/textile.category.model";
import CategoriesTextileGateway from "../../../domain/models/TextileCategory/gateway/categories.textile.gateway";





@controller("/Category")
export class CategoryController implements interfaces.Controller {

    constructor(
        @inject("SavecategoryUsecase")
        private savecategoryUsecase : SavecategoryUsecase ,
        @inject("GetcategoryUsecase")
        private getcategoryUsecase: GetcategoryUsecase,
        @inject("GetcategoryBynameUsecase")
        private getcategoryBynameUsecase: GetcategoryBynameUsecase,
        @inject("UpdateCategoryByIdUsecase")
        private updateCategoryByIdUsecase: UpdateCategoryByIdUsecase,
        @inject("CategoriesTextileGateway")
        private categoriesTextileGateway: CategoriesTextileGateway ,
        @inject("GetCategoryrByIdtUsecase")
        private getCategoryrByIdtUsecase: GetCategoryrByIdtUsecase,
        @inject("DeleteCategoryUsecase")
        private deleteCategoryUsecase: DeleteCategoryUsecase
    ) { }


    // Crear Categoria

    @httpPost("/")
    async saveCategory(req: express.Request, res: express.Response) {
        try {
            const callUsecaseCategory = await this.savecategoryUsecase.invoke(
                req.body,
            );
            if (callUsecaseCategory.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Category",
                            NOTIFICATION_STATUS_422,
                            callUsecaseCategory.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Category",
                            NOTIFICATION_STATUS_201,
                            callUsecaseCategory
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Category", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//  obtener categorias

     @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getcategoryUsecase = await this.getcategoryUsecase.invoke();
            if (getcategoryUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Category",
                            NOTIFICATION_STATUS_400,
                            getcategoryUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Category",
                            NOTIFICATION_STATUS_200,
                            getcategoryUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Category", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//   Obtener categoria por nombre 

    @httpGet("/:name")
    async getcategoryByname(
        @requestParam("name") name: string,
        @response() res: express.Response
    ) {
        try {
            const getCategoryBynameUsecase = await this.getcategoryBynameUsecase.invoke(name);
            if (getCategoryBynameUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Category",
                            NOTIFICATION_STATUS_404,
                            getCategoryBynameUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Category",
                            NOTIFICATION_STATUS_200,
                            getCategoryBynameUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Category", NOTIFICATION_STATUS_500, error)
                );
        }
    }


//    Actualizar Categoria

@httpPut("/category/:id/")
async updateById(
  @requestParam("id") id: string,
  @requestBody() categoryData: Partial<categoriestextileModel>,
  @response() res: express.Response
) {
  try {
    const objectId = new Types.ObjectId(id);
    const updateCategoryUsecase = new UpdateCategoryByIdUsecase(this.categoriesTextileGateway); // Pasar el CategoryGateway
    const updatedCategory = await updateCategoryUsecase.invoke(objectId, categoryData);

    res.status(status.OK).send(
      NotificationEnvelope.build("Category", NOTIFICATION_STATUS_200, updatedCategory)
    );
  } catch (error) {
    if (error.name === "CastError") {
      res.status(status.BAD_REQUEST).send(
        NotificationEnvelope.build(
          "Category",
          NOTIFICATION_STATUS_400,
          "El ID proporcionado no es válido"
        )
      );
    } else if (error.message.includes("no encontrado")) {
      res.status(status.NOT_FOUND).send(
        NotificationEnvelope.build(
          "Category",
          NOTIFICATION_STATUS_404,
          error.message
        )
      );
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send(
        NotificationEnvelope.build("Category", NOTIFICATION_STATUS_500, error)
      );
    }
  }
}
 
//  //Delete Productos
 

@httpDelete("/:id") // Cambiar a parámetro de ruta
  async deleteById(
    @requestParam("id") id: string, // Parámetro de ruta como string
    @response() res: express.Response
  ) {
    try {
      const objectId = new Types.ObjectId(id); // Convertir a ObjectId

      const deleteResult = await this.deleteCategoryUsecase.invoke(objectId);

      if (deleteResult === false) { // Simplificar la lógica del error
        res.status(status.NOT_FOUND).send(
          NotificationEnvelope.build(
            "TextileCategory",
            NOTIFICATION_STATUS_404,
            `No se encontró la categoria con el ID ${id}`
          )
        );
      } else {
        res.status(status.OK).send(
          NotificationEnvelope.build(
            "TextileCategory",
            NOTIFICATION_STATUS_200,
            "Categoria eliminada correctamente" // Respuesta genérica
          )
        );
      }
    } catch (error) {
      if (error.name === 'CastError') { // Manejar error de formato de ID
        res.status(status.BAD_REQUEST).send(
          NotificationEnvelope.build(
            "TextileCategory",
            NOTIFICATION_STATUS_400, // Usar un código 400
            'El ID proporcionado no es válido'
          )
        );
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).send(
          NotificationEnvelope.build("TextileCategory", NOTIFICATION_STATUS_500, error)
        );
      }
    }
  }



}