import { injectable } from "inversify";
import textileinventory, {
  textileInventoryModel
} from "../../../domain/models/textileInventory/textile.inventory.model";
import TextileInventoryGateway from "../../../domain/models/textileInventory/gateway/textile.inventory.gateway";
import { ObjectId, Types } from "mongoose";
import TextileInventoryModel from "../../../domain/models/textileInventory/textile.inventory.model";



@injectable()
export class TextileInventoryService extends TextileInventoryGateway {
  async save(obj: textileInventoryModel): Promise<textileInventoryModel> {
    const newTextileInventory = new textileinventory(obj);
    let responseBd: any = null;
    try {
      responseBd = await newTextileInventory.save();
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

  //retorno listado de telas

  async get(): Promise<textileInventoryModel> {
    let getResponseBd: any = null;
    try {
      getResponseBd = await textileinventory.find()
        .populate('category')
    } catch (error) {
      getResponseBd = {
        error: error,
      };
    }
    return getResponseBd;
  }


  // retorno nombre de telas  

  async getByname(name: string) {
    let getBynameResponseBd: any = null;
    try {
      getBynameResponseBd = await textileinventory.findOne({ name: { $regex: new RegExp(name, "i") } })
      .populate('category')
    } catch (error) {
      getBynameResponseBd = {
        error: error,
      };
    }
    return getBynameResponseBd;
  }


  //actualizar telas por id 
  async updateById(id: Types.ObjectId, categoryData: Partial<textileInventoryModel>): Promise<textileInventoryModel> {
    return await TextileInventoryModel.findByIdAndUpdate(id, categoryData, { new: true });
  }



// encontrar tela por id 
  async getById(_id: Types.ObjectId): Promise<textileInventoryModel | null> {
    const textile = await TextileInventoryModel.findById(_id)
    .populate('category')
    if (!textile) {
      throw new Error(`No se encontró la tela con ID: ${_id}`);
    }
    return textile;
  }

    //Borrar Tela por Id 
  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    try {
      await TextileInventoryModel.deleteOne({ _id });
      return true;
    } catch (error) {
      console.error("Error eliminando la tela: ", error);
      return false;
    }
  }

}


