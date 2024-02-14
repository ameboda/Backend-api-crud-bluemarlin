// se agregan los datos de la informaciones que deseo crear en este caso hare la tabla de vendedores


import { Document, model, Schema } from "mongoose"; // importo los archivo de mongosse (conexion con los datos de la BD MONGO)

export interface sellersModel extends Document { // creo la interface de type script para definir la variables 
  [x: string]: any;
  cc: number;
  name: string; 
  lastName: string; 
  phoneSeller: number;
  email:string; 
  password: string;  

  
}

const sellerSchema = new Schema({ // se agregan los datos el typo de dato y si es requerido en la base de datos 
  cc:{
    type: Number, 
    required: true, 
  },
  name:{
    type: String,
    required: true,
  }, 
  lastName: {
    type: String,
    required:true, 
  },
  phoneSeller: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true, 
  },
  password:{
    type: String, 
    required: true
  },

  dateCreate: { type: Date, default: Date.now },
});

const SellerModel = model<sellersModel>("Sellers", sellerSchema); // se configura el model en una variable 

export default SellerModel; // se exporta la variable 
