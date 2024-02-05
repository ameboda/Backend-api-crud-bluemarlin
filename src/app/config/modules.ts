import { Container } from "inversify";


//user
import CustomerGateway from '../domain/models/customer/gateway/customer.gateway';
import { CustomerService } from "../infrastructure/driven-adapters/customer/customer.service";
import { CustomerController } from "../infrastructure/entry-points/customer/customer-controller";
import { GetCustomerUsecase } from "../domain/usecases/customer/get-customer.usecase";
// import { GetUserByIdUsecase } from '../domain/usecases/user/get-user-by-id.usecase';
import { SaveCustomerUsecase } from "../domain/usecases/customer/save-customer.usecase";
import { UpdateCustomerUsecase } from "../domain/usecases/customer/update-customer.usecase";
// import { DeleteUserUsecase } from "../domain/usecases/user/delete-user.usecase";
// import { LoginUserUsecase } from "../domain/usecases/user/login-user.usecase";



export const container = new Container();
//Customer
container.bind<SaveCustomerUsecase>("SaveCustomerUsecase").to(SaveCustomerUsecase);
container.bind<GetCustomerUsecase>("GetCustomerUsecase").to(GetCustomerUsecase);

// container.bind<GetUserByIdUsecase>("GetUserByIdUsecase").to(GetUserByIdUsecase);
container.bind<UpdateCustomerUsecase>("UpdateCustomerUsecase").to(UpdateCustomerUsecase);
// container.bind<DeleteUserUsecase>("DeleteUserUsecase").to(DeleteUserUsecase);
// container.bind<LoginUserUsecase>("LoginUserUsecase").to(LoginUserUsecase);
container.bind<CustomerController>("CustomerController").to(CustomerController);
container.bind<CustomerGateway>("CustomerGateway").to(CustomerService);

