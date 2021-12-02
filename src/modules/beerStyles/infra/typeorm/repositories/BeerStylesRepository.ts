import { ICreateBeerStyleDTO } from "@modules/beerStyles/dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "@modules/beerStyles/dtos/IUpdateBeerStyleDTO";
import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { getRepository, Raw, Repository } from "typeorm";

import { BeerStyle } from "../entities/BeerStyle";

class BeerStylesRepository implements IBeerStyleRepository {
  private ormRepository: Repository<BeerStyle>;

  constructor() {
    this.ormRepository = getRepository(BeerStyle);
  }

  async findAll(name = ""): Promise<BeerStyle[]> {
    return this.ormRepository.find({
      where: {
        name: Raw((alias) => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      },
    });
  }

  async findById(id: string): Promise<BeerStyle> {
    return this.ormRepository.findOne(id);
  }

  async findByName(name: string): Promise<BeerStyle> {
    const beerStyle = await this.ormRepository.findOne({
      where: {
        name: Raw((alias) => `LOWER(${alias}) = '${name.toLowerCase()}'`),
      },
    });

    return beerStyle;
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
