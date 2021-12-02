import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

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
    if (
      !name ||
      name.length === 0 ||
      (!minimum_temperature && minimum_temperature !== 0) ||
      (!maximum_temperature && maximum_temperature !== 0)
    ) {
      throw new AppError(
        "Can't create a beer style with nullable name, minimum or maximum temperatures!"
      );
    }

    if (minimum_temperature > maximum_temperature) {
      throw new AppError(
        "Minimum temperature can't be greater than maximum temperature!"
      );
    }

    const findByName = await this.beerStylesRepository.findByName(name);

    if (findByName) {
      throw new AppError("A beer style with this name already exists!");
    }

    const beerStyle = await this.beerStylesRepository.create({
      name,
      minimum_temperature,
      maximum_temperature,
    });

    return beerStyle;
  }
}

export { CreateBeerStyleUseCase };
