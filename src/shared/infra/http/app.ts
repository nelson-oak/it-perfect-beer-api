import "reflect-metadata";

import cors from "cors";
import express from "express";

import createConnection from "@shared/infra/typeorm";

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

export { app };
