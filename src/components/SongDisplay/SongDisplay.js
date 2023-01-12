import React from "react";
import "./SongDisplay.scss";
import SpotifyBlack from "./assets/spotify-black.png"

class SongDisplay extends React.Component {
    render() {
        return (
            <a href={this.props.url} target="_blank" rel="noreferrer" className="song-component">
                <div className="song-container">
                    <img className="album-art" src={this.props.cover_art} alt="album art"/>
                    <div className="song-metadata">
                        <p className="song-title">{this.props.title}</p>
                        <p>{this.props.artists.join(", ")} - {this.props.album}</p>
                    </div>
                </div>
                <img className="spotify-logo" src={SpotifyBlack} alt="spotify logo"/>
            </a>
        );
    }
}

export default SongDisplay