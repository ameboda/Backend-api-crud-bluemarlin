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
import { GetproductBycodeUsecase  } from "../../../domain/usecases/products/get-product-by-code.usecase"; 
import { GetproductBynameUsecase } from "../../../domain/usecases/products/get-product-by-name.usecase";
import { UpdateProductUsecase } from "../../../domain/usecases/products/update-product.usecase";
import { DeleteProductUsecase } from "../../../domain/usecases/products/delete-product-bycode.usecase";



import { NotificationEnvelope } from "../../helper/notification/exceptions";
import {
    NOTIFICATION_STATUS_200,
    NOTIFICATION_STATUS_201,
    NOTIFICATION_STATUS_400,
    NOTIFICATION_STATUS_404,
    NOTIFICATION_STATUS_422,
    NOTIFICATION_STATUS_500,
} from "../../helper/notification/exceptions.constants";
import { Types } from "mongoose";





@controller("/Products")
export class ProductsController implements interfaces.Controller {

    constructor(
        @inject("SaveproductUsecase")
        private saveproductUsecase: SaveproductUsecase,
        @inject("GetproductUsecase")
        private getproductUsecase: GetproductUsecase,
        @inject("GetproductBycodeUsecase")
        private getproductBycodeUsecase  : GetproductBycodeUsecase  ,
        @inject("GetproductBynameUsecase")
        private getproductBynameUsecase: GetproductBynameUsecase,
        @inject("UpdateProductUsecase")
        private updateProductUsecase: UpdateProductUsecase,
        @inject("DeleteProductUsecase")
        private deleteProductUsecase : DeleteProductUsecase  ,
       
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
             const getProductsUsecase = await this.getproductUsecase.invoke();
             if (getProductsUsecase.error) {
                 res
                     .status(status.OK)
                     .send(
                         NotificationEnvelope.build(
                             "Products",
                             NOTIFICATION_STATUS_400,
                             getProductsUsecase.error
                         )
                     );
             } else {
                 res
                     .status(status.OK)
                     .send(
                         NotificationEnvelope.build(
                             "Products",
                             NOTIFICATION_STATUS_200,
                             getProductsUsecase
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

    @httpGet("/code/:codProduct")
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

    // Obtener producto por nombre 

    @httpGet("/name/:name")
    async getproductByname(
        @requestParam("name") name: string,
        @response() res: express.Response
    ) {
        try {
            const getProductBynameUsecase = await this.getproductBynameUsecase.invoke(name);
            if (getProductBynameUsecase.error) {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Product",
                            NOTIFICATION_STATUS_404,
                            getProductBynameUsecase.error
                        )
                    );
            } else {
                res
                    .status(status.OK)
                    .send(
                        NotificationEnvelope.build(
                            "Product",
                            NOTIFICATION_STATUS_200,
                            getProductBynameUsecase
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

   //ACTUALIZACION PRODUCTOS 

   @httpPut("/code/:codProduct") 
   async updateProduct(
       @requestParam("codProduct") codProductOriginal: string,
       @request() req: express.Request,
       @response() res: express.Response
   ) {
       try {
           const param = req.body;
           const paramsAndproduct = { codProductOriginal, ...param };
           const respondeUpdateProduct= await this.updateProductUsecase.invoke(paramsAndproduct);
           if (respondeUpdateProduct.error) {
               res
                   .status(status.OK)
                   .send(
                       NotificationEnvelope.build(
                           "Product",
                           NOTIFICATION_STATUS_404,
                           respondeUpdateProduct.error
                       )
                   );
           } else {
               res
                   .status(status.OK)
                   .send(
                       NotificationEnvelope.build(
                           "Product",
                           NOTIFICATION_STATUS_200,
                           respondeUpdateProduct
                       )
                   );
           }
       } catch (error) {
           res
               .status(status.INTERNAL_SERVER_ERROR)
               .send(
                   NotificationEnvelope.build(
                       "Product",
                       NOTIFICATION_STATUS_500,
                       error
                   )
               );
       }
   }
 
 //Delete Productos
 

 @httpDelete("/:codProduct")
 async deleteProductByCode(
   @requestParam("codProduct") codProduct: string,
   @response() res: express.Response
 ) {
   try {
     const wasDeleted = await this.deleteProductUsecase.invoke(codProduct);

     if (wasDeleted) {
       return res.status(200).json({ message: 'Producto eliminado con éxito' });
     } else {
       return res.status(404).json({ message: 'Producto no encontrado' });
     }
     
   } catch (error) {
     console.error("Error al eliminar producto", error);
     return res.status(500).json({ message: 'Error interno del servidor' }); 
   }
 }
}


