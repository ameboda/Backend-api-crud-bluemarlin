import { injectable } from "inversify";
import { sellersModel } from "../../sellers/sellers.model";

@injectable()
abstract class LoginGateway {

  abstract login(obj): Promise<sellersModel>;
  
}

export default LoginGateway;
