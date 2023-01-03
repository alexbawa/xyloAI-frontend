import React from "react";
import { Navigate } from "react-router-dom";
import Spotify from "../../util/spotify";
import Server from "../../util/server";

class LoginHandler extends React.Component {
    async componentDidMount() {
        const token = window.location.href.match(/access_token=([^&]*)/)[1];
        const timeout = window.location.href.match(/expires_in=([^&]*)/)[1];

        this.props.updateAuth({token}, timeout);
        
        const spotifyUser = await Spotify.getSpotifyUser(token);
        const user = await Server.getUserByEmail(spotifyUser.email);
        
        this.props.updateUser(user);
    }

    render() {
        if(this.props.user) {
            return <Navigate to="/dashboard"/>
        } else {
            return (
                <div className="page-container">
                    <p>Communicating with Spotify ... </p>
                </div>
            )
        }
    }
}

export default LoginHandler;