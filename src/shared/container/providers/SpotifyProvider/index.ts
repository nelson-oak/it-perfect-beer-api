import { container } from "tsyringe";

import { SpotifyWebApiNodeProvider } from "./implementations/SpotifyWebApiNodeProvider";
import { ISpotifyProvider } from "./ISpotifyProvider";

const spotifyProvider = {
  spotifyWebApiNode: container.resolve(SpotifyWebApiNodeProvider),
};

container.registerInstance<ISpotifyProvider>(
  "SpotifyProvider",
  spotifyProvider[process.env.SPOTIFY_PROVIDER]
);
