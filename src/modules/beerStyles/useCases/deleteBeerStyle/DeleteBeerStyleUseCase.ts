import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteBeerStyleUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute(id: string) {
    const beerStyleExists = await this.beerStylesRepository.findById(id);

    if (!beerStyleExists) {
      throw new AppError("This beer style doesn't exists!", 404);
    }

    await this.beerStylesRepository.delete(id);
  }
}

export { DeleteBeerStyleUseCase };
