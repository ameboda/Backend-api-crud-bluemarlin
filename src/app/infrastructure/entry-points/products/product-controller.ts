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


import { SaveproductUsecase } from "../../../domain/usecases/products/save-products.usecase";
import { GetproductUsecase } from "../../../domain/usecases/products/get-products.usecase"; 
import { GetproductBycodeUsecase  } from "../../../domain/usecases/products/get-product-by-code"; 
// import { UpdateCategoriesUsecase } from "../../../domain/usecases/categories/update-categories.usecase";
// import { GetCategoriesBynameUsecase } from "../../../domain/usecases/categories/get-categories-by-name";
// import { DeleteCategoriesUsecase} from "../../../domain/usecases/categories/delete-categories-by-name";

import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";





@controller("/Products")
export class ProductsController implements interfaces.Controller {

    constructor(
        @inject("SaveproductUsecase")
        private saveproductUsecase: SaveproductUsecase,
        @inject("GetproductUsecase")
        private getproductUsecase: GetproductUsecase,
        @inject("GetproductBycodeUsecase")
        private getproductBycodeUsecase  : GetproductBycodeUsecase  ,
        // @inject("UpdateCategoriesUsecase")
        // private updateCategoriesUsecase: UpdateCategoriesUsecase,
        // @inject("GetCategoriesBynameUsecase")
        // private getCategoriesBynameUsecase: GetCategoriesBynameUsecase,
        // @inject("DeleteCategoriesUsecase")
        // private deleteCategoriesUsecase  : DeleteCategoriesUsecase ,
       
    ) { }


    // Crear Productos

    @httpPost("/")
    async saveProducts(req: express.Request, res: express.Response) {
        try {
            const callUsecaseProducts = await this.saveproductUsecase.invoke(
                req.body,
            );
            if (callUsecaseProducts.error) {
                res
                    .status(NOTIFICATION_STATUS_422)
                    .send(
                        NotificationEnvelope.build(
                            "Products",
                            NOTIFICATION_STATUS_422,
                            callUsecaseProducts.error
                        )
                    );
            } else {
                res
                    .status(status.CREATED)
                    .send(
                        NotificationEnvelope.build(
                            "Products",
                            NOTIFICATION_STATUS_201,
                            callUsecaseProducts
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Products", NOTIFICATION_STATUS_500, error)
                );
        }
    }


     //Obtener Productos

     @httpGet("/")
    async get(@response() res: express.Response) {
        try {
            const getproductUsecase = await this.getproductUsecase.invoke();
            if (getproductUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Products",
                            NOTIFICATION_STATUS_400,
                            getproductUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Products",
                            NOTIFICATION_STATUS_200,
                            getproductUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Products", NOTIFICATION_STATUS_500, error)
                );
        }
    }

    // Obtener productos por cod-prod

    @httpGet("/product/:product")
    async getproductBycode(
        @requestParam("codProduct") codProduct: string,
        @response() res: express.Response
    ) {
        try {
            const getProductBycodeUsecase = await this.getproductBycodeUsecase.invoke(codProduct);
            if (getProductBycodeUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Product",
                            NOTIFICATION_STATUS_404,
                            getProductBycodeUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Product",
                            NOTIFICATION_STATUS_200,
                            getProductBycodeUsecase
                        )
                    );
            }
        } catch (error) {
            res
                .status(status.INTERNAL_SERVER_ERROR)
                .send(
                    NotificationEnvelope.build("Product", NOTIFICATION_STATUS_500, error)
                );
        }
    }



  

  

    //    //Actualizacion Categories

    // @httpPut("/") 
    // async updateCategories(
    //     @requestParam("categories") categories: string,
    //     @request() req: express.Request,
    //     @response() res: express.Response
    // ) {
    //     try {
    //         const param = req.body;
    //         const paramsAndcategories = { categories, ...param };
    //         const respondeUpdateCategories= await this.updateCategoriesUsecase.invoke(paramsAndcategories);
    //         if (respondeUpdateCategories.error) {
    //             res
    //                 .status(status.OK)
    //                 .send(
    //                     NotificationEnvelope.build(
    //                         "Categories",
    //                         NOTIFICATION_STATUS_404,
    //                         respondeUpdateCategories.error
    //                     )
    //                 );
    //         } else {
    //             res
    //                 .status(status.OK)
    //                 .send(
    //                     NotificationEnvelope.build(
    //                         "Categories",
    //                         NOTIFICATION_STATUS_200,
    //                         respondeUpdateCategories
    //                     )
    //                 );
    //         }
    //     } catch (error) {
    //         res
    //             .status(status.INTERNAL_SERVER_ERROR)
    //             .send(
    //                 NotificationEnvelope.build(
    //                     "Categories",
    //                     NOTIFICATION_STATUS_500,
    //                     error
    //                 )
    //             );
    //     }
    // }

    // //Consulta  Categoria por ID 

    // @httpGet("/:id")
    // async getById(@requestParam("id") id: string, @response() res: express.Response) {
    //   try {
    //     const category = await this.getcategoriesByIDUsecase.invoke(id); // Llamada al caso de uso
    
    //     if (!category) {
    //       return res
    //         .status(status.NOT_FOUND)
    //         .send('Categoría no encontrada'); // 
    //     }
    
    //     return res
    //       .status(status.OK)
    //       .send(category);
    
    //   } catch (error) {
    //     res
    //       .status(status.INTERNAL_SERVER_ERROR)
    //       .send(NotificationEnvelope.build("categoria no encontrada", NOTIFICATION_STATUS_500, error));
    //   }
    // }
    

 

    

    // //Delete Categoria 
 

    // @httpDelete("/:name")
    // async deleteCategoryByName(
    //   @requestParam("name") name: string,
    //   @response() res: express.Response
    // ) {
    //   try {
    //     const result = await this.deleteCategoriesUsecase.invoke(name);
 
    //     if (!result) { // Maneja el caso donde no se eliminó
    //       res
    //         .status(status.NOT_FOUND)
    //         .send(NotificationEnvelope.build("Categories", NOTIFICATION_STATUS_404, 'Categoría no encontrada'));
    //       return; 
    //     }
 
    //     res
    //       .status(status.OK)
    //       .send(NotificationEnvelope.build("Categories", NOTIFICATION_STATUS_200, 'Categoría eliminada exitosamente'));
    //   } catch (error) {
    //     res
    //       .status(status.INTERNAL_SERVER_ERROR)
    //       .send(NotificationEnvelope.build("Categories", NOTIFICATION_STATUS_500, error));
    //   }
    // }

   


// }










}