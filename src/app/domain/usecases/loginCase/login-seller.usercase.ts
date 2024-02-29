import { inject, injectable } from "inversify";
import { sellersModel } from "../../models/sellers/sellers.model";
import LoginGateway from "../../models/login/gateway/login.gateway";
import bcrypt from "bcrypt";

@injectable()
export class LoginSellerUsecase {
  constructor(
    @inject("LoginGateway") private loginGateway: LoginGateway
  ) {}


  async invoke(param: sellersModel): Promise<sellersModel | { error: string }> { // actualizacion retorno tipo
    
   


    // Validación de email y contraseña
    if (!param.email || !param.password) {
      return { error: "Correo o contraseña incorrectos" };
    }

    try {
      const existingSeller = await this.loginGateway.login(param.email);
      if (existingSeller) {
        const passwordMatch = await bcrypt.compare(param.password, existingSeller.password);

        if (passwordMatch) {
          existingSeller.password = '';
          return existingSeller; // retornado con exito!
        } else {
          return { error: "Correo o contraseña incorrectos" };
        }
      } else {
        return { error: "Correo o contraseña incorrectos" }; // Usuario no encontrado
      }
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Error al intentar iniciar sesión" };
    }
  }
}


