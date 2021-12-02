import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListBeerStyleByIdUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  async execute(id: string) {
    const beerStyle = await this.beerStylesRepository.findById(id);

    return beerStyle;
  }
}

export { ListBeerStyleByIdUseCase };
