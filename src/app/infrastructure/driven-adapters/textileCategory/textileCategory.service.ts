import { injectable } from "inversify";
import category, {
  categoriestextileModel,
} from "../../../domain/models/TextileCategory/textile.category.model";
import CategoriesTextileGateway from "../../../domain/models/TextileCategory/gateway/categories.textile.gateway";
import { ObjectId, Types } from "mongoose";
import CategoriesTextileModel from "../../../domain/models/TextileCategory/textile.category.model";






// crear categoria textiles
@injectable()
export class CategoryService extends CategoriesTextileGateway {
  async save(obj: categoriestextileModel): Promise<categoriestextileModel> {
    const newCategory = new category(obj);
    let responseBd: any = null;
    try {
      responseBd = await newCategory.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors: any = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        responseBd = {
          error: errors,
        };
      }
    }
    return responseBd;
  }

//Listar Categorias

async get(): Promise<categoriestextileModel> {
  let getResponseBd: any = null;
  try {
    getResponseBd = await category.find(); 
  } catch (error) {
    getResponseBd = {
      error: error,
    };
  }
  return getResponseBd;
}


// Obtener nombre de la categoria telas

async getByname(name: string) {
  let getBynameResponseBd: any = null;
  try {
    getBynameResponseBd = await category.findOne({ name: { $regex : new RegExp(name, "i") }});
  } catch (error) {
    getBynameResponseBd = {
      error: error,
    };
  }
  return getBynameResponseBd;  
}


// Actualizar categoria por Id 

async updateById(id: Types.ObjectId, categoryData: Partial<categoriestextileModel>): Promise<categoriestextileModel> {
  return await CategoriesTextileModel.findByIdAndUpdate(id, categoryData, { new: true });
}


//Delete By Id

 async getById(_id: Types.ObjectId): Promise<categoriestextileModel> {
  return await CategoriesTextileModel.findById(_id);
}
 async deleteById(_id: Types.ObjectId): Promise<boolean> {
  try {
    await CategoriesTextileModel.deleteOne({ _id });
    return true;
  } catch (error) {
    console.error("Error eliminando categoria: ", error);
    return false;
  }
}

}


