import { ICreateBeerStyleDTO } from "@modules/beerStyles/dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "@modules/beerStyles/dtos/IUpdateBeerStyleDTO";
import { BeerStyle } from "@modules/beerStyles/infra/typeorm/entities/BeerStyle";

import { IBeerStyleRepository } from "../IBeerStylesRepository";

class FakeBeerStylesRepository implements IBeerStyleRepository {
  private beerStyles: BeerStyle[] = [];

  async findAll(name?: string): Promise<BeerStyle[]> {
    return this.beerStyles.filter((beerStyle) =>
      beerStyle.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async findById(id: string): Promise<BeerStyle> {
    return this.beerStyles.find((beerStyle) => id === beerStyle.id);
  }

  async findByName(name: string): Promise<BeerStyle> {
    return this.beerStyles.find(
      (beerStyle) => name.toLowerCase() === beerStyle.name.toLowerCase()
    );
  }

  async filterByTemperatureRange(temperature: string): Promise<BeerStyle[]> {
    throw new Error("Method not implemented.");
  }

  async create({
    name,
    minimum_temperature,
    maximum_temperature,
  }: ICreateBeerStyleDTO): Promise<BeerStyle> {
    const beerStyle = new BeerStyle();

    Object.assign(beerStyle, {
      name,
      minimum_temperature,
      maximum_temperature,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.beerStyles.push(beerStyle);

    return beerStyle;
  }

  async update({
    id,
    name,
    minimum_temperature,
    maximum_temperature,
  }: IUpdateBeerStyleDTO): Promise<BeerStyle> {
    const beerStyleIndex = this.beerStyles.findIndex(
      (beerStyle) => beerStyle.id === id
    );

    this.beerStyles[beerStyleIndex].name = name;
    this.beerStyles[beerStyleIndex].minimum_temperature = minimum_temperature;
    this.beerStyles[beerStyleIndex].maximum_temperature = maximum_temperature;

    return this.beerStyles[beerStyleIndex];
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { FakeBeerStylesRepository };
