import { SPOTIFY_BASE_URL } from "../constants";

const Spotify = {
    createAuthHeader(token) {
        return {
            Authorization: `Bearer ${token}`,
        }
    }, 

    async getSpotifyUser(token) {
        const headers = this.createAuthHeader(token);
        let userResponse = await fetch(`${SPOTIFY_BASE_URL}/me`, {headers});
        userResponse = await userResponse.json();
    
        return {
            email: userResponse.email,
            id: userResponse.id,
        };
        
    }
}

export default Spotify;