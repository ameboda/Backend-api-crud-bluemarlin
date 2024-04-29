import { injectable } from "inversify";
import sellers, {
    sellersModel,
} from "../../../domain/models/sellers/sellers.model";
import LoginGateway from "../../../domain/models/login/gateway/login.gateway";
import { params } from "inversify-express-utils";

@injectable()
export class LoginService extends LoginGateway {


    async login(email: string) {
        let LoginResponseBd: any = null;
        try {
          LoginResponseBd = await sellers.findOne({ email: { $regex : new RegExp(email, "i") }});
        } catch (error) {
          LoginResponseBd = {
            error: error,
          };
        }
        return LoginResponseBd;
      } 




}