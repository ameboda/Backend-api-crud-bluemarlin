import { inject, injectable } from "inversify";
import SellerGateway from "../../models/sellers/gateway/sellers.gateway";
import { sellersModel } from "../../../domain/models/sellers/sellers.model";
import bcrypt from "bcrypt";

@injectable()
export class SavesellerUsecase {
  constructor(@inject("SellerGateway") private sellerGateway: SellerGateway) {}

  async invoke(param: sellersModel): Promise<sellersModel> {
    let responseBD: any;
    let responseSellerUsecaseemail: any;
    let responseSellerUsecasecc: any;
    let responsegetSellercc = await this.sellerGateway.getBycc(param.cc);
    let responsegetSellereemail = await this.sellerGateway.getByemail(
      param.email
    );

  

    // Validación email y cedula con switch:
    if (responsegetSellercc) {
      responseSellerUsecasecc = {
        error: "ya existe este numero de cedula",
      };
      return responseSellerUsecasecc;
    }
    if (responsegetSellereemail) {
      responseSellerUsecaseemail = {
        error: "ya existe este correo",
      };
      return responseSellerUsecaseemail;
    }
    // encriptacion de contraseña con bycrypt
    const saltrounds = 10; //cantidad de hash que deseo crear
    const salt = await bcrypt.genSalt(saltrounds); //generacion del hash en la variable saltrounds
    const hashedPassword = await bcrypt.hash(param.password, salt); //realiza el hashing en la contraseña ,param contraseña plana y salt la cadena aleatoria generada
    param.password = hashedPassword;

    responseBD = this.sellerGateway.save(param);
    return responseBD;
  }
}
