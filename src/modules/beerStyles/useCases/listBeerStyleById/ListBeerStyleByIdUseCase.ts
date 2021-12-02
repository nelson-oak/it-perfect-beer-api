import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListBeerStyleByIdUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute(id: string) {
    const beerStyle = await this.beerStylesRepository.findById(id);

    if (!beerStyle) {
      throw new AppError("This beer style id doesn't exists!", 404);
    }

    return beerStyle;
  }
}

export { ListBeerStyleByIdUseCase };
