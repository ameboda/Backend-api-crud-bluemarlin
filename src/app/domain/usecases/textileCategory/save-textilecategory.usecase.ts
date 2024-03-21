import { inject, injectable } from "inversify";
import CategoriesTextileGateway from "../../models/TextileCategory/gateway/categories.textile.gateway";
import { categoriestextileModel } from "../../models/TextileCategory/textile.category.model";

@injectable()
export class SavecategoryUsecase {
    constructor(
        @inject("CategoriesTextileGateway") private categoriesTextileGateway: CategoriesTextileGateway
    ) { }

    async invoke(param: categoriestextileModel): Promise<categoriestextileModel> {
        let responseBD: any;

        try {
            // 1. Verificar si la categoria ya existe
            const existingCategory = await this.categoriesTextileGateway.getByname(param.name);
            if (existingCategory) {
                throw new Error("El nombre de la categoria ya existe");
            }

            // Guardar  si no existe la categoria 
            responseBD = await this.categoriesTextileGateway.save(param);
            return responseBD;
        } catch (error) {
            // Manejar la excepción y devolver el mensaje de error
            return Promise.reject(error.message);
        }
    }
}