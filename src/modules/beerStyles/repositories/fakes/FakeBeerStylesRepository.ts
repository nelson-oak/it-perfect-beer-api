import { ICreateBeerStyleDTO } from "@modules/beerStyles/dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "@modules/beerStyles/dtos/IUpdateBeerStyleDTO";
import { BeerStyle } from "@modules/beerStyles/infra/typeorm/entities/BeerStyle";

import { IBeerStyleRepository } from "../IBeerStylesRepository";

class FakeBeerStylesRepository implements IBeerStyleRepository {
  private beerStyles: BeerStyle[] = [];

  async findAll(name?: string): Promise<BeerStyle[]> {
    return this.beerStyles;
  }

  async findByID(id: string): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<BeerStyle> {
    const beerStyle = this.beerStyles.find(
      (beerStyle) => name.toLowerCase() === beerStyle.name.toLowerCase()
    );

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

  async update(data: IUpdateBeerStyleDTO): Promise<BeerStyle> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { FakeBeerStylesRepository };
