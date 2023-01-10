import React from "react";
import { AUTH_PATH } from "../../constants";
import PageMenu from "../../components/PageMenu/PageMenu";
import SpotifyLogo from "./assets/spotify-white.png";
import "./LandingPage.scss";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.startLogin = this.startLogin.bind(this);
    }

    async startLogin() {
        window.location = AUTH_PATH;
    }

    render() {
        return (
            <div className="page-container">
                <div className="landing-top">
                    <PageMenu pages={[
                        {
                            url: "/",
                            name: "Home"
                        },
                        {
                            url: "/about",
                            name: "About"
                        },
                        {
                            url: "/contact",
                            name: "Contact"
                        },
                    ]}/>
                    <div onClick={this.startLogin} className="start-button">
                        <p>Continue with</p>
                        <img src={SpotifyLogo} alt="Spotify Logo"/>
                    </div>
                </div>
                <div className="landing-splash">
                    <div className="splash-info">
                        <p className="splash-heading">Generate playlists with AI</p>
                        <p className="splash-text">We combine inspiration from your playlists and a powerful language model to make exciting new playlists like never before.</p>
                    </div>
                    <div className="splash-graphic"></div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
