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

    const findBeerStyleByName = await this.beerStylesRepository.findByName(
      String(name)
    );

    if (findBeerStyleByName && beerStyleExists.id !== findBeerStyleByName.id) {
      throw new AppError("This beer style name already exists!");
    }

    const updatedBeerStyle = await this.beerStylesRepository.update({
      id,
      name: name || beerStyleExists.name,
      minimum_temperature:
        !minimum_temperature && minimum_temperature !== 0
          ? beerStyleExists.minimum_temperature
          : minimum_temperature,
      maximum_temperature:
        !minimum_temperature && minimum_temperature !== 0
          ? beerStyleExists.maximum_temperature
          : maximum_temperature,
    });

    return updatedBeerStyle;
  }
}

export { UpdateBeerStyleUseCase };
