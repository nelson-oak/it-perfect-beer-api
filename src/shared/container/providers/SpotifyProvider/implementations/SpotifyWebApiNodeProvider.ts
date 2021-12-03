import SpotifyApi from "spotify-web-api-node";

import { ISpotifyProvider } from "../ISpotifyProvider";

interface ITrack {
  name: string;
  artist: string;
  link: string;
}

interface IPlaylistsResponse {
  name: string;
  tracks: ITrack[];
}

interface IStatusCodeResponse {
  status: number;
  message: string;
}

class SpotifyWebApiNodeProvider implements ISpotifyProvider {
  private spotifyApi: SpotifyApi;
  constructor() {
    this.spotifyApi = new SpotifyApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
  }

  async searchPlaylists(
    filter: string
  ): Promise<IPlaylistsResponse | IStatusCodeResponse> {
    const playlistsFound = await this.spotifyApi.searchPlaylists(filter, {
      limit: 1,
    });

    if (playlistsFound.statusCode === 200) {
      if (
        playlistsFound.body.playlists &&
        playlistsFound.body.playlists.total > 0
      ) {
        const firstPlaylist = playlistsFound.body.playlists.items[0];

        const tracksFound = await this.spotifyApi.getPlaylistTracks(
          firstPlaylist.id
        );

        const tracks: ITrack[] = [];

        if (tracksFound.statusCode === 200) {
          tracksFound.body.items.map(({ track }) =>
            tracks.push({
              name: track.name,
              artist: track.artists[0].name,
              link: track.uri,
            })
          );

          return {
            name: firstPlaylist.name,
            tracks,
          };
        }
      }
      return {
        status: 204,
        message: "No playlist found!",
      };
    }

    return {
      status: 500,
      message: "Error while tried to connect with spotify!",
    };
  }
}

export { SpotifyWebApiNodeProvider };
