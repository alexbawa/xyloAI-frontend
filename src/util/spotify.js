const clientID = 

const Spotify = {
    async getToken() {
        if(accessToken) {
            return accessToken
        }
    
        const token = window.location.href.match(/access_token=([^&]*)/);
        const expiration = window.location.href.match(/expires_in=([^&]*)/);
    
        if(token && expiration) {
            accessToken = token[1];
            const expiresIn = Number(expiration[1]);
            window.setTimeout(() => {
                accessToken = ''
            }, expiresIn*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = url;
            const token = window.location.href.match(/access_token=([^&]*)/);
            const expiration = window.location.href.match(/expires_in=([^&]*)/);
    
            if(token && expiration) {
                accessToken = token[1];
                const expiresIn = Number(expiration[1]);
                window.setTimeout(() => {
                    accessToken = ''
                }, expiresIn*1000);
            window.history.pushState('Access Token', null, '/');
            }
            return accessToken;
        }
    },
}
