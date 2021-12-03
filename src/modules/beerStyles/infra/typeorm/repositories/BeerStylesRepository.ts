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
        name: Raw(
          (alias) =>
            `LOWER(${alias}) Like '%${name ? name.toLowerCase() : ""}%'`
        ),
      },
    });
  }

  async findById(id: string): Promise<BeerStyle> {
    return this.ormRepository.findOne(id);
  }

  async findByName(name: string): Promise<BeerStyle> {
    return this.ormRepository.findOne({
      where: {
        name: Raw((alias) => `LOWER(${alias}) = '${name.toLowerCase()}'`),
      },
    });
  }

  async findOneByTemperatureRange(temperature: number): Promise<BeerStyle> {
    return this.ormRepository.query(`
      SELECT *
      FROM beer_styles
      WHERE minimum_temperature <= ${temperature}
      AND maximum_temperature >= ${temperature}
      ORDER BY name ASC
    `);
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

  async update({
    id,
    name,
    minimum_temperature,
    maximum_temperature,
  }: IUpdateBeerStyleDTO): Promise<BeerStyle> {
    const beerStyle = await this.ormRepository.findOne(id);

    beerStyle.name = name;
    beerStyle.minimum_temperature = minimum_temperature;
    beerStyle.maximum_temperature = maximum_temperature;

    await this.ormRepository.save(beerStyle);

    return beerStyle;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { BeerStylesRepository };
