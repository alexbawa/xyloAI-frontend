import { BACKEND_BASE_URL } from "../constants";

const Server = {
    async getUserByEmail(email) {
        try {
            let user = await fetch(`${BACKEND_BASE_URL}/user/byEmail/${email}`);
            user = user.json();
            return user
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
}

export default Server;