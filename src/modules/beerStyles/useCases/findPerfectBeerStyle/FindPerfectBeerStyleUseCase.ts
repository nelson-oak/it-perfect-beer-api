import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { inject, injectable } from "tsyringe";

import { ISpotifyProvider } from "@shared/container/providers/SpotifyProvider/ISpotifyProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  temperature?: number;
}

@injectable()
class FindPerfectBeerStyleUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository,

    @inject("SpotifyProvider")
    private spotifyProvider: ISpotifyProvider
  ) {}

  async execute({ temperature }: IRequest) {
    const perfectBeer =
      await this.beerStylesRepository.findOneByTemperatureRange(temperature);

    if (!perfectBeer) {
      throw new AppError("Perfect beer style doesn't found");
    }

    const playlist = await this.spotifyProvider.searchPlaylists(
      perfectBeer.name
    );

    return {
      beerStyle: perfectBeer.name,
      playlist,
    };
  }
}

export { FindPerfectBeerStyleUseCase };
