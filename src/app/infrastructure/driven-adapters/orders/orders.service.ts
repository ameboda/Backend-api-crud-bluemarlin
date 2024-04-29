import { injectable } from "inversify";
import order, {
  orderModel
} from "../../../domain/models/orders/orders.model";
import OrdersGateway from "../../../domain/models/orders/gateway/orders.gateway";
import OrderModel from "../../../domain/models/orders/orders.model";





@injectable()
export class OrderService extends OrdersGateway {
  async save(obj: orderModel): Promise<orderModel> {
    const newOrder = new order(obj);
    let responseBd: any = null;

    try {
      responseBd = await newOrder.save();
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


//   //retorno listado pedidos

  async get(): Promise<orderModel> {
    let getResponseBd: any = null;
    try {
      getResponseBd = await order.find()
      .populate("Customer")
      .populate("Sellers")
    } catch (error) {
      getResponseBd = {
        error: error,
      };
    }
    return getResponseBd;
  }



// // encontrar orden por id pedido
async getById(idOrder: number): Promise<orderModel> {
  try {
    const order = await OrderModel.findOne({ idOrder }) 
      .populate("Customer")
      .populate("Sellers");

    if (!order) {
      throw new Error('Order not found');      
    }

    return order;
  } catch (error) {
    throw error; 
  }
}


async updateById(idOrder: number, updates: Partial<orderModel>) {
  let updateByIdResponseBd: any = null;
  try {
    const filter = { idOrder }; // Buscar por ID
    updateByIdResponseBd = await order.updateOne(filter, updates);

  } catch (error) {
    updateByIdResponseBd = {
      error: error,
    };
  }
  return updateByIdResponseBd;
} 


    //Borrar Tela por Id 
  async deleteById(idOrder: number): Promise<boolean> {
    try {
      await OrderModel.deleteOne({ idOrder});
      return true;
    } catch (error) {
      console.error("Error eliminando el Pedido: ", error);
      return false;
    }
  }

}

