import { BeerStyle } from "@modules/beerStyles/infra/typeorm/entities/BeerStyle";
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
    const perfectBeers =
      await this.beerStylesRepository.findAllByTemperatureRange(temperature);

    if (perfectBeers.length === 0) {
      throw new AppError("Perfect beer style doesn't found");
    }

    let selectedBeerIdx = 0;

    perfectBeers.forEach((beer, idx) => {
      if (idx) {
        let previousBeer =
          temperature - perfectBeers[selectedBeerIdx].minimum_temperature;
        let currentBeer = temperature - beer.minimum_temperature;

        previousBeer = previousBeer < 0 ? previousBeer * -1 : previousBeer;
        currentBeer = currentBeer < 0 ? currentBeer * -1 : currentBeer;

        if (currentBeer < previousBeer) {
          selectedBeerIdx = idx;
        }
      }
    });

    const playlist = await this.spotifyProvider.searchPlaylists(
      perfectBeers[selectedBeerIdx].name
    );

    return {
      beerStyle: perfectBeers[selectedBeerIdx].name,
      playlist,
    };
  }
}

export { FindPerfectBeerStyleUseCase };
