import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

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
