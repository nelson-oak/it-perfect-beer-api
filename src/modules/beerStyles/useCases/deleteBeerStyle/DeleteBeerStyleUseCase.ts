import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteBeerStyleUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute(id: string) {
    throw new Error("Method not implemented.");
  }
}

export { DeleteBeerStyleUseCase };
