import { ICreateBeerStyleDTO } from "@modules/beerStyles/dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "@modules/beerStyles/dtos/IUpdateBeerStyleDTO";
import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";

import { BeerStyle } from "../entities/BeerStyle";

class BeerStylesRepository implements IBeerStyleRepository {
  async find(): Promise<BeerStyle[]> {
    throw new Error("Method not implemented.");
  }

  async findByID(id: string): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async filterByTemperatureRange(temperature: string): Promise<BeerStyle[]> {
    throw new Error("Method not implemented.");
  }

  async create(data: ICreateBeerStyleDTO): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async update(data: IUpdateBeerStyleDTO): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { BeerStylesRepository };
