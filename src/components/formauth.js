import config from "../utils/config"

export const createPlaylist = async (
    accessToken,
    userId,
    { name, description }
  ) => {
    const data = JSON.stringify({
      name,
      description,
      public: false,
      collaborative: false,
    });
  
    const requestOptions = {
      method: "POST",
      body: data,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(
      `${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`,
      requestOptions
    ).then((data) => data.json());
  
    return response;
  };
  
  export const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
    const data = JSON.stringify({
      uris,
    });
  
    const requestOptions = {
      method: "POST",
      body: data,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(
      `${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
      requestOptions
    ).then((data) => data.json());
  
    return response;
  };