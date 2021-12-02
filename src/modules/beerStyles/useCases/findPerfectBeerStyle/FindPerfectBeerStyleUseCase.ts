import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  temperature?: string;
}

@injectable()
class FindPerfectBeerStyleUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute({ temperature }: IRequest) {
    throw new Error("Method not implemented.");
  }
}

export { FindPerfectBeerStyleUseCase };
