import { injectable } from "inversify";

import Person, {
  IPersonModel,
} from "../../../domain/models/practica-person/person.model";
import PersonGateway from "../../../domain/models/practica-person/gateway/person.gateway";

@injectable()
export class PersonService extends PersonGateway {


  async save(obj: IPersonModel): Promise<IPersonModel> {
    const newPerson = new Person(obj);
    let responseBd: any = null;
    try {
      responseBd = await newPerson.save();
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

  async get(): Promise<IPersonModel> {
    let getResponseBd: any = null;
    try {
      getResponseBd = await Person.find();
    } catch (error) {
      getResponseBd = {
        error: error,
      };
    }
    return getResponseBd;
  }

}
