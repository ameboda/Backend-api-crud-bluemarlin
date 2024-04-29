import { injectable } from "inversify";
import cutting, {
  cuttingModel
} from "../../../domain/models/cuttingPlanning/cuttingPlannigModel";
import CuttingGateway from "../../../domain/models/cuttingPlanning/gateway/cutting.gateway";
import CuttingModel from "../../../domain/models/cuttingPlanning/cuttingPlannigModel";





@injectable()
export class CuttingService extends CuttingGateway {
  async save(obj: cuttingModel): Promise<cuttingModel> {
    const newCutting = new cutting(obj);
    let responseBd: any = null;

    try {
      responseBd = await newCutting.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors: any = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        responseBd = {
          error: errors,
        };
      } else {
        throw error;
      }
    }

    return responseBd;
  }


// retorno listado corte

  async get(): Promise<cuttingModel> {
    let getResponseBd: any = null;
    try {
      getResponseBd = await cutting.find()
      .populate("order")
      .populate("inventorytextile")
    } catch (error) {
      getResponseBd = {
        error: error,
      };
    }
    return getResponseBd;
  }



// encontrar orden por id pedido
async getById(idCutting: number): Promise<cuttingModel> {
  try {
    const cutting = await CuttingModel.findOne({ idCutting }) 
    .populate("order")
    .populate("inventorytextile") 

    if (!cutting) {
      throw new Error('Orden de Corte no encontrada');      
    }

    return cutting;
  } catch (error) {
    throw error; 
  }
}


async updateById(idCutting: number, updates: Partial<cuttingModel>) {
  let updateByIdResponseBd: any = null;
  try {
    const filter = { idCutting }; // Buscar por ID
    updateByIdResponseBd = await cutting.updateOne(filter, updates);

  } catch (error) {
    updateByIdResponseBd = {
      error: error,
    };
  }
  return updateByIdResponseBd;
} 


    //Borrar Tela por Id 
  async deleteById(idCutting: number): Promise<boolean> {
    try {
      await CuttingModel.deleteOne({ idCutting});
      return true;
    } catch (error) {
      console.error("Error eliminando la Orden de Corte: ", error);
      return false;
    }
  }

}

