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
        
    },

    async getUserPlaylists(token, userID) {
        const headers = this.createAuthHeader(token);
        let playlistResponse = await fetch(`${SPOTIFY_BASE_URL}/users/${userID}/playlists`, {headers});
        playlistResponse = await playlistResponse.json();

        return playlistResponse.items.map(playlist => {
            return {
                name: playlist.name,
                id: playlist.id,
                image_url: playlist.images[0].url,
            }
        })
    },

    async getPlaylistSongs(token, playlistID) {
        const headers = this.createAuthHeader(token);
        let songResponse = await fetch(`${SPOTIFY_BASE_URL}/playlists/${playlistID}/tracks`, {headers});
        songResponse = await songResponse.json();

        return songResponse.items.map(item => {
            return {
                title: item.track.name,
                artist: item.track.artists[0].name
            }
        });
    },

    async findMatchingSongs(token, songs) {
        const headers = this.createAuthHeader(token);
        let validSongs = songs.filter(song => {
            return song.length > 0
        })

        let matchingTracks = await Promise.all(validSongs.map(song => {
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${song}`, {headers}).then(response => response.json());
        }));

        return matchingTracks.map(tracks => {
            let song = tracks.tracks.items[0];
            return song.id
        })
    },

    async batchGetSongsByID(token, songIDs) {
        const headers = this.createAuthHeader(token);

        let songs = await Promise.all(songIDs.map(songID => {
            return fetch(`https://api.spotify.com/v1/tracks/${songID}`,{headers}).then(response => response.json());
        }))

        return songs.map(song => {
            return {
                id: song.id,
                title: song.name,
                artists: song.artists.map(artist => artist.name),
                coverArt: song.album.images[0].url,
            }
        })
    }
}

export default Spotify;