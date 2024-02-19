import "reflect-metadata";
import cors from "cors";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { StrucutreMiddleware } from "./app/infrastructure/middlewares/stuctureMiddleware";
import { startConnection } from "./app/config/database";
import { container } from "./app/config/modules";


const port = 3001;
const server = new InversifyExpressServer(container);


const allowedOrigins = [
    'http://localhost:4200',    
  ];

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };

  server.setConfig((app) => {
    //app.use(morgan("dev"));
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(StrucutreMiddleware());
  });

  const app = server.build();
  startConnection();

  app.listen(port, () => {
    console.log('corriendo servidor en puerto '+port+'');
    
  });