import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  minimum_temperature: number;
  maximum_temperature: number;
}

@injectable()
class CreateBeerStyleUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute({ name, minimum_temperature, maximum_temperature }: IRequest) {
    throw new Error("Method not implemented.");
  }
}

export { CreateBeerStyleUseCase };
