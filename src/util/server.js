import { BACKEND_BASE_URL } from "../constants";

const Server = {
    async getUserByEmail(email) {
        try {
            let user = await fetch(`${BACKEND_BASE_URL}/user/byEmail/${email}`);
            if(user.status !== 404) {
                user = user.json();
                return user;
            }
            throw new Error("User does not exist");
        } catch (err) {
            let user = await fetch(`${BACKEND_BASE_URL}/user/`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({spotify_email: email}),
            });
            user = user.json();
            return user;
        }  
    },

    async generateSongs(count, songs, description) {
        let options = {
            count,
            songs,
            description,
        }

        let generatedSongs = await fetch(`${BACKEND_BASE_URL}/generate`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({options: options}),
        })
        generatedSongs = await generatedSongs.json();
        return generatedSongs;
    },

    async createPlaylist(userID, songs) {
        let createdPlaylist = await fetch(`${BACKEND_BASE_URL}/user/${userID}/playlist`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({songs: songs})
        })

        createdPlaylist = await createdPlaylist.json();
        return createdPlaylist;
    }
}

export default Server;