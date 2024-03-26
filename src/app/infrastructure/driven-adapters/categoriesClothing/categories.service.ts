import { id, injectable } from "inversify";
import categories, {
  categoriesModel,
} from "../../../domain/models/categoriesClothing/categories.model";
import CategoriesGateway  from "../../../domain/models/categoriesClothing/gateway/categories.gateway";
import CategoriesModel from "../../../domain/models/categoriesClothing/categories.model";


@injectable()
export class CategoriesService extends CategoriesGateway {
  async save(obj: categoriesModel): Promise<categoriesModel> {
    const newCategories = new categories(obj);
    let responseBd: any = null;
    try {
      responseBd = await newCategories.save();
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

//retorno de categorias
async get(): Promise<categoriesModel> {
  let getResponseBd: any = null;
  try {
    getResponseBd = await CategoriesModel.find();
  } catch (error) {
    getResponseBd = {
      error: error,
    };
  }
  return getResponseBd;
}

  // retorno de actualizacion categoria 
  async updateCategories(obj: categoriesModel) {
    let updateCategoriesResponseBd: any = null;
    try {
      const filter = { categories: obj.categories };
      updateCategoriesResponseBd = await categories.updateOne(filter, obj);
    } catch (error) {
      updateCategoriesResponseBd = {
        error: error,
      };
    }
    return updateCategoriesResponseBd;
  }


//retorno de Categoria por nombre 
async getByname(name: string) {
  let getBynameResponseBd: any = null;
  try {
    getBynameResponseBd = await CategoriesModel.findOne({ name: { $regex : new RegExp(name, "i") }});
  } catch (error) {
    getBynameResponseBd = {
      error: error,
    };
  }
  return getBynameResponseBd;
}

// Obtener una categoría por ID

async getById(id: string): Promise<categoriesModel | null> { 
  try {
    // Busca la categoria por id
    const category = await categories.findById({ _id: id });

    // Retorna el vendedor si existe, null en caso contrario
    return category; 

  } catch (error) {
    // Maneja el error de forma específica
    console.error('Error obteniendo categoria por id', error);
    throw new Error('Error al obtener la categoria'); 
  }
}

 // borrar categoria con metodo delete 
 
 async deleteCategoriesByname(categories: string): Promise<boolean> {
  try {
    await CategoriesModel.deleteOne({ categories: categories });
    return true; // Se eliminó exitosamente
  } catch (error) {
    console.error('Error eliminando categoría: ', error);
    return false; // Error en la eliminación
  }
}
}

