import { BeerStylesRepository } from "@modules/beerStyles/infra/typeorm/repositories/BeerStylesRepository";
import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { container } from "tsyringe";

container.registerSingleton<IBeerStyleRepository>(
  "BeerStylesRepository",
  BeerStylesRepository
);
