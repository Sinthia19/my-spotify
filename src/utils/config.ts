interface TypeConfig {
  SPOTIFY_BASE_URL : string;
  SPOTIFY_SCOPE : string;
  RESPONSE_TYPE : string;
  REDIRECT_URI : string;
}

const config: TypeConfig = {
    SPOTIFY_BASE_URL: 'https://api.spotify.com/v1',
    SPOTIFY_SCOPE: 'playlist-modify-private',
    RESPONSE_TYPE: 'token',
    REDIRECT_URI: 'http://localhost:3000/',
  };
  
 export default config;