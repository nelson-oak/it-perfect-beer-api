import { ICreateBeerStyleDTO } from "../dtos/ICreateBeerStyleDTO";
import { IUpdateBeerStyleDTO } from "../dtos/IUpdateBeerStyleDTO";
import { BeerStyle } from "../infra/typeorm/entities/BeerStyle";

interface IBeerStyleRepository {
  find(): Promise<BeerStyle[]>;
  findByID(id: string): Promise<BeerStyle>;
  findByName(name: string): Promise<BeerStyle>;
  filterByTemperatureRange(temperature: string): Promise<BeerStyle[]>;
  create(data: ICreateBeerStyleDTO): Promise<BeerStyle>;
  update(data: IUpdateBeerStyleDTO): Promise<BeerStyle>;
  delete(id: string): Promise<void>;
}

export { IBeerStyleRepository };
