import { injectable } from "inversify";
import product, {
    productModel,
} from "../../../domain/models/products/products.model";
import ProductGateway from "../../../domain/models/products/gateway/products.gateway";
import ProductModel from "../../../domain/models/products/products.model";




@injectable()
export class ProductService extends ProductGateway {
  async save(obj: productModel): Promise<productModel> {
    try {
      const newProduct = new ProductModel(obj); // Usamos el modelo Mongoose directamente
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      if (error.name === "ValidationError") {
        // ... Manejo de errores de validación (puedes reutilizar el tuyo)
        throw new Error('Validation Error: ...'); // Recomendado lanzar un error personalizado
      } else {
        throw error;  // Relanzar otros errores para su manejo general
      }
    }
  }

//retorno de productos

async get(): Promise<productModel> {
  let getResponseBd: any = null;
  
  try {
    getResponseBd = await product.find()
    .populate("category")
    .populate("colors");
  } catch (error) {
    getResponseBd = {
      error: error,
    };
  }
  return getResponseBd;
}


// Obtener un producto por CodProd

async getBycode(codProduct: string) {
  let getBycodeResponseBd: any = null;
  try {
    getBycodeResponseBd = await product.findOne({ codProduct: { $regex : new RegExp(codProduct, "i") }})
    .populate("category")
    .populate("colors"); 
  } catch (error) {
    getBycodeResponseBd = {
      error: error,
    };
  }
  return getBycodeResponseBd;  
}

//Get name for product
async getByname(name: string) {
  let getBynameResponseBd: any = null;
  try {
    getBynameResponseBd = await product.findOne({ name: { $regex : new RegExp(name, "i") }})
    .populate("category")
    .populate("colors")
  } catch (error) {
    getBynameResponseBd = {
      error: error,
    };
  }
  return getBynameResponseBd;  
}


 // Actualizar Producto 
 async updateProduct(obj: productModel) {
  let updateProductResponseBd: any = null;
  try {
    const filter = { codProduct: obj.codProductOriginal };
    updateProductResponseBd= await product.updateOne(filter, obj);
  } catch (error) {
    updateProductResponseBd = {
      error: error,
    };
  }
  return updateProductResponseBd;
  
}


 // borrar categoria con metodo delete 
 
 async deleteByCode(codProduct: string): Promise<boolean> {
  try {
    const deleteResult = await ProductModel.deleteOne({ codProduct });
    return deleteResult.deletedCount > 0;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}


}










