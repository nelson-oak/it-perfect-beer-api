import { ICreateBeerStyleDTO } from "@modules/beerStyles/dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "@modules/beerStyles/dtos/IUpdateBeerStyleDTO";
import { BeerStyle } from "@modules/beerStyles/infra/typeorm/entities/BeerStyle";

import { IBeerStyleRepository } from "../IBeerStylesRepository";

class FakeBeerStylesRepository implements IBeerStyleRepository {
  find(): Promise<BeerStyle[]> {
    throw new Error("Method not implemented.");
  }
  findByID(id: string): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }
  filterByTemperatureRange(temperature: string): Promise<BeerStyle[]> {
    throw new Error("Method not implemented.");
  }
  create(data: ICreateBeerStyleDTO): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }
  update(data: IUpdateBeerStyleDTO): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { FakeBeerStylesRepository };
