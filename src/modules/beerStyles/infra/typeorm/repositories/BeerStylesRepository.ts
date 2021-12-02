import { ICreateBeerStyleDTO } from "@modules/beerStyles/dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "@modules/beerStyles/dtos/IUpdateBeerStyleDTO";
import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { getRepository, Repository } from "typeorm";

import { BeerStyle } from "../entities/BeerStyle";

class BeerStylesRepository implements IBeerStyleRepository {
  private ormRepository: Repository<BeerStyle>;

  constructor() {
    this.ormRepository = getRepository(BeerStyle);
  }

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

  async create({
    name,
    minimum_temperature,
    maximum_temperature,
  }: ICreateBeerStyleDTO): Promise<BeerStyle> {
    const beerStyle = this.ormRepository.create({
      name,
      minimum_temperature,
      maximum_temperature,
    });

    await this.ormRepository.save(beerStyle);

    return beerStyle;
  }

  async update(data: IUpdateBeerStyleDTO): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { BeerStylesRepository };
