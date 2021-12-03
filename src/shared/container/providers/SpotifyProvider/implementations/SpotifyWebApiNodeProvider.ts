import axios from "axios";
import qs from "qs";
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

    this.setAuth().catch((err: Error) => {
      console.error({ type: "Spotify Auth Error", message: err.message });
    });
  }

  async setAuth() {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.SPOTIFY_CLIENT_ID,
        password: process.env.SPOTIFY_CLIENT_SECRET,
      },
    };
    const data = {
      grant_type: "client_credentials",
    };

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    this.spotifyApi.setAccessToken(response.data.access_token);
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
              link: track.external_urls.spotify,
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
      message: "Error on playlist search!",
    };
  }
}

export { SpotifyWebApiNodeProvider };
