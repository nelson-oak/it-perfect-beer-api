import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import "@shared/container";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.log(err.message);

    return response.status(500).json({
      message: `Internal Server Error`,
    });
  }
);

export { app };
