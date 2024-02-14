import { Container } from "inversify";


//Customer importaciones
import CustomerGateway from '../domain/models/customer/gateway/customer.gateway';
import { CustomerService } from "../infrastructure/driven-adapters/customer/customer.service";
import { CustomerController } from "../infrastructure/entry-points/customer/customer-controller";
import { GetCustomerUsecase } from "../domain/usecases/customer/get-customer.usecase";
import { GetCustomerByNameUsecase } from "../domain/usecases/customer/get-customer-by-name.usecase";
import { GetCustomerByNitUsecase } from "../domain/usecases/customer/get-customer-by-nit.usecase";
import { SaveCustomerUsecase } from "../domain/usecases/customer/save-customer.usecase";
import { UpdateCustomerUsecase } from "../domain/usecases/customer/update-customer.usecase";


//Person importaciones
import PersonGateway from '../domain/models/practica-person/gateway/person.gateway';
import { PersonService } from "../infrastructure/driven-adapters/practica-person/person.service";
import { PersonController } from "../infrastructure/entry-points/practica-person/person-controller";
import { GetPersonUsecase } from "../domain/usecases/practica-person/get-person.usecase";
import { SavePersonUsecase } from "../domain/usecases/practica-person/save-person.usecase";




//Sellers importaciones
import SellerGateway from '../domain/models/sellers/gateway/sellers.gateway';
import { SellerService } from "../infrastructure/driven-adapters/sellers/sellers.service";
import { SellerController } from "../infrastructure/entry-points/sellers/seller-controller";
import { GetsellerUsecase } from "../domain/usecases/SellersCase/get-seller.usecase";
import { SavesellerUsecase} from "../domain/usecases/SellersCase/save-seller.usecase";



export const container = new Container();
//Customer
container.bind<SaveCustomerUsecase>("SaveCustomerUsecase").to(SaveCustomerUsecase);
container.bind<GetCustomerUsecase>("GetCustomerUsecase").to(GetCustomerUsecase);
container.bind<GetCustomerByNitUsecase>("GetCustomerByNitUsecase").to(GetCustomerByNitUsecase);
container.bind<GetCustomerByNameUsecase>("GetCustomerByNameUsecase").to(GetCustomerByNameUsecase);
container.bind<UpdateCustomerUsecase>("UpdateCustomerUsecase").to(UpdateCustomerUsecase);
container.bind<CustomerController>("CustomerController").to(CustomerController);
container.bind<CustomerGateway>("CustomerGateway").to(CustomerService);


//Person

container.bind<SavePersonUsecase>("SavePersonUsecase").to(SavePersonUsecase);
container.bind<GetPersonUsecase>("GetPersonUsecase").to(GetPersonUsecase);
container.bind<PersonController>("PersonController").to(PersonController);
container.bind<PersonGateway>("PersonGateway").to(PersonService);


//Sellers
container.bind<SavesellerUsecase>("SavesellerUsecase").to(SavesellerUsecase);
container.bind<GetsellerUsecase >("GetsellerUsecase").to( GetsellerUsecase );
container.bind<SellerController>("SellerController").to(SellerController);
container.bind<SellerGateway>("SellerGateway").to(SellerService);
// container.bind<sellerService>("sellerService").to(sellerService);


