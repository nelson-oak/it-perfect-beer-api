interface IPlaylistsResponse {
  name: string;
  tracks: Array<{
    name: string;
    artist: string;
    link: string;
  }>;
}

interface IStatusCodeResponse {
  status: number;
  message: string;
}

interface ISpotifyProvider {
  setAuth(): Promise<void>;
  searchPlaylists(
    filter: string
  ): Promise<IPlaylistsResponse | IStatusCodeResponse>;
}

export { ISpotifyProvider };
