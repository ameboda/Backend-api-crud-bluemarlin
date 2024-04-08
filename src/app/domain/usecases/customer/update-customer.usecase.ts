import { inject, injectable } from "inversify";
import { ICustomerModel } from "../../models/customer/customer.model";
import CustomerGateway from "../../models/customer/gateway/customer.gateway";

@injectable()
export class UpdateCustomerUsecase {
  constructor(
    @inject("CustomerGateway") private customerGateWay: CustomerGateway
  ) {}

  async invoke(nit: number, updates: Partial<ICustomerModel>): Promise<ICustomerModel | null> {
    try { 
      const updatedCustomer = await this.customerGateWay.updateByNit(nit, updates);

      if (updatedCustomer) {
        return updatedCustomer; 
      } else {
        // Handle case where customer with the provided NIT is not found
        throw new Error(`cliente con NIT ${nit} no encontrado`); 
      }

    } catch (error) {
      console.error("Error actualizando cliente:", error);
      // Consider re-throwing the error or returning a custom error for better handling
      throw error;  
    }
  }
}