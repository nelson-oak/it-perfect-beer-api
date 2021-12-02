import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

interface IBeerStyle {
  name: string;
  minimum_temperature: number;
  maximum_temperature: number;
}

interface IRequest {
  csvData: IBeerStyle[];
}

@injectable()
class ImportBeerStyleByCsvUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute({ csvData }: IRequest) {
    throw new Error("Method not implemented.");
  }
}

export { ImportBeerStyleByCsvUseCase };
