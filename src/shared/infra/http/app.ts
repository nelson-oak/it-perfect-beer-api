import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import "@shared/container";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `Internal Server Error + ${err.message}`,
    });
  }
);

export { app };
