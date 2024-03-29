const SPOTIFY_CLIENT_ID = "2accbf6594814133b4896f97cc66f93a";
const BASE_URL = "http://localhost:3000";
const AUTH_REDIRECT_URL = BASE_URL + "/loginHandler/";
const AUTH_SCOPES = ["playlist-modify-public", "playlist-read-private", "user-read-email"]
const AUTH_PATH =  `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&scope=${AUTH_SCOPES.join(" ")}&redirect_uri=${AUTH_REDIRECT_URL}`;
const BACKEND_BASE_URL = "http://localhost:4000/api";
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";


module.exports = {
    AUTH_PATH,
    BACKEND_BASE_URL,
    SPOTIFY_BASE_URL,
}