import { inject, injectable } from "inversify";
import PersonGateway from "../../models/practica-person/gateway/person.gateway";
import { IPersonModel } from "../../../domain/models/practica-person/person.model"

@injectable()
export class GetPersonUsecase {
  constructor(
    @inject("PersonGateway") private personGateway: PersonGateway
  ) {}
  async invoke(): Promise<IPersonModel> {
    const responseUserCase = await this.personGateway.get();
    return responseUserCase;
  }
}