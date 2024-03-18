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
import { GetsellerByccUsecase } from "../domain/usecases/SellersCase/get-seller-by-cc.usecase";
import { GetsellerBynameUsecase } from "../domain/usecases/SellersCase/get-seller-by-name.usecase";
import { UpdateSellerUsecase } from "../domain/usecases/SellersCase/update-seller.usecase";
import { GetSellerByemailUsecase } from "../domain/usecases/SellersCase/get-seller-by-email.usecase"; 
import { DeleteSellerUsecase } from "../domain/usecases/SellersCase/delete-seller-usecase"; 


//Login 
import  LoginGateway from "../domain/models/login/gateway/login.gateway";
import {LoginService } from "../infrastructure/driven-adapters/login/login.service";
import {LoginSellerUsecase} from "../domain/usecases/loginCase/login-seller.usercase"
import {LoginController} from "../infrastructure/entry-points/login/login-controller";


//Categories

import CategoriesGateway  from '../domain/models/categories/gateway/categories.gateway';
import { CategoriesService } from "../infrastructure/driven-adapters/categories/categories.service";
import { CategoriesController} from "../infrastructure/entry-points/categories/categories-controller";
import { SavecategoriesUsecase} from "../domain/usecases/categories/save-categories.usecase";
import { UpdateCategoriesUsecase } from "../domain/usecases/categories/update-categories.usecase";
import { GetcategoriesUsecase } from "../domain/usecases/categories/get-categories.usecase";
import { GetCategoriesBynameUsecase } from "../domain/usecases/categories/get-categories-by-name.usecase";
import { GetcategoriesByIDUsecase } from "../domain/usecases/categories/get-categories-byID.usecase";
import { DeleteCategoriesUsecase } from "../domain/usecases/categories/delete-categories-by-name.usecase"; 



//Products 
import ProductGateway from "../domain/models/products/gateway/products.gateway";
import { ProductService } from "../infrastructure/driven-adapters/products/products.service";
import { ProductsController } from "../infrastructure/entry-points/products/product-controller";
import { SaveproductUsecase } from "../domain/usecases/products/save-products.usecase";
import { GetproductUsecase } from "../domain/usecases/products/get-products.usecase";
import {GetproductBycodeUsecase} from "../domain/usecases/products/get-product-by-code.usecase"
import { GetproductBynameUsecase } from "../domain/usecases/products/get-product-by-name.usecase";
import { DeleteProductUsecase } from "../domain/usecases/products/delete-product-bycode.usecase";
import { UpdateProductUsecase } from "../domain/usecases/products/update-product.usecase";


// TEXTILE COLOR 
import ColorGateway from "../domain/models/textilecolor/gateway/color.gateway";
import { ColorService } from "../infrastructure/driven-adapters/textilecolor/color.service";
import { ColorController } from "../infrastructure/entry-points/textilecolor/color-controller";
import { SavecolorUsecase } from "../domain/usecases/textilecolor/save-color.usecase";
import { GetcolorUsecase} from "../domain/usecases/textilecolor/get-color.usecase";
import { GetcolorBynameUsecase } from "../domain/usecases/textilecolor/get-color-byname.usecase";
import { UpdateColorByIdUsecase } from "../domain/usecases/textilecolor/update-color.usecase";
import { GetColorByIdtUsecase } from "../domain/usecases/textilecolor/get-color-ById.usecase";
import { DeleteColorUsecase} from "../domain/usecases/textilecolor/delete-color-byId.usecase"



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
container.bind<GetsellerByccUsecase>("GetsellerByccUsecase").to(GetsellerByccUsecase);
container.bind<GetsellerBynameUsecase>("GetsellerBynameUsecase").to(GetsellerBynameUsecase);
container.bind<UpdateSellerUsecase>("UpdateSellerUsecase").to(UpdateSellerUsecase);
container.bind<GetSellerByemailUsecase>("GetsellerByemailUsecase").to(GetSellerByemailUsecase);
container.bind<DeleteSellerUsecase>("DeleteSellerUsecase").to(DeleteSellerUsecase);



//Login 

container.bind<LoginSellerUsecase>("LoginSellerUsecase").to(LoginSellerUsecase);
container.bind<LoginController>("loginController").to(LoginController);
container.bind<LoginService>("loginService").to(LoginService);
container.bind<LoginGateway>("LoginGateway").to(LoginService);



//Categories 
container.bind<SavecategoriesUsecase>("SavecategoriesUsecase").to(SavecategoriesUsecase);
container.bind<CategoriesController>("categoriesController").to(CategoriesController);
container.bind<CategoriesGateway>("CategoriesGateway").to(CategoriesService);
container.bind<UpdateCategoriesUsecase>("UpdateCategoriesUsecase").to(UpdateCategoriesUsecase);
container.bind<GetcategoriesUsecase>("GetcategoriesUsecase").to( GetcategoriesUsecase );
container.bind<GetCategoriesBynameUsecase>("GetCategoriesBynameUsecase").to(GetCategoriesBynameUsecase);
container.bind<GetcategoriesByIDUsecase>("GetcategoriesByIDUsecase").to(GetcategoriesByIDUsecase);
container.bind<DeleteCategoriesUsecase>("DeleteCategoriesUsecase").to(DeleteCategoriesUsecase); 




// Products 
container.bind<ProductGateway>("ProductGateway").to(ProductService);
container.bind<ProductsController>("productsController").to(ProductsController);
container.bind<SaveproductUsecase>("SaveproductUsecase").to(SaveproductUsecase);
container.bind<GetproductUsecase>("GetproductUsecase").to( GetproductUsecase );
container.bind<GetproductBycodeUsecase>("GetproductBycodeUsecase").to( GetproductBycodeUsecase );
container.bind<GetproductBynameUsecase>("GetproductBynameUsecase").to(GetproductBynameUsecase)
container.bind<DeleteProductUsecase>("DeleteProductUsecase").to(DeleteProductUsecase);
container.bind<UpdateProductUsecase>("UpdateProductUsecase").to(UpdateProductUsecase); 



//Color 
container.bind<ColorGateway>("ColorGateway").to(ColorService);
container.bind<ColorController>("ColorController").to(ColorController);
container.bind<SavecolorUsecase>("SavecolorUsecase").to(SavecolorUsecase);
container.bind<GetcolorUsecase>("GetcolorUsecase").to(GetcolorUsecase);
container.bind<GetcolorBynameUsecase>("GetcolorBynameUsecase").to(GetcolorBynameUsecase);
container.bind<UpdateColorByIdUsecase>("UpdateColorByIdUsecase").to(UpdateColorByIdUsecase); 
container.bind<GetColorByIdtUsecase>("GetColorByIdtUsecase").to(GetColorByIdtUsecase)
container.bind<DeleteColorUsecase>("DeleteColorUsecase").to(DeleteColorUsecase);