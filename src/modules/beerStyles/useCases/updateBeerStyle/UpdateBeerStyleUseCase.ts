import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  name?: string;
  minimum_temperature?: number;
  maximum_temperature?: number;
}

@injectable()
class UpdateBeerStyleUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute({
    id,
    name,
    minimum_temperature,
    maximum_temperature,
  }: IRequest) {
    const beerStyleExists = await this.beerStylesRepository.findById(id);

    if (!beerStyleExists) {
      throw new AppError("This beer style doesn't exists!", 404);
    }

    const updatedBeerStyle = await this.beerStylesRepository.update({
      id,
      name,
      minimum_temperature,
      maximum_temperature,
    });

    return updatedBeerStyle;
  }
}

export { UpdateBeerStyleUseCase };
