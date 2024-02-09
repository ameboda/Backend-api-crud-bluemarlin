import { inject, injectable } from "inversify";
import PersonGateway from "../../models/practica-person/gateway/person.gateway";
import { IPersonModel } from "../../../domain/models/practica-person/person.model"

@injectable()
export class SavePersonUsecase {
  constructor(
    @inject("PersonGateway") private personGateway: PersonGateway
  ) {}
   async invoke(param: IPersonModel): Promise<IPersonModel> {
    let responseBD: any;
    responseBD = this.personGateway.save(param);
    return responseBD;
  }
}
