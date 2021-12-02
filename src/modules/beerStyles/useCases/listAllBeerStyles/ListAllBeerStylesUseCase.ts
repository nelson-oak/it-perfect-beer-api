import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name?: string;
}

@injectable()
class ListAllBeerStylesUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute({ name = "" }: IRequest) {
    throw new Error("Method not implemented.");
  }
}

export { ListAllBeerStylesUseCase };
