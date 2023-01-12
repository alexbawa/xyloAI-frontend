import React from "react";
import { Navigate } from "react-router-dom";
import Server from "../../util/server";
import Spotify from "../../util/spotify";
import SpotifyLogo from "./assets/spotify-black.png";
import Arrow from "./assets/arrow_forward.png";
import Loading from "./assets/loading.png";
import "./SearchBar.scss";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            inspiration: this.props.userPlaylists[0].id,
            draftID: null,
            status: null,
        }

        this.updateDescription = this.updateDescription.bind(this);
        this.updateInspiration = this.updateInspiration.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
    }

    updateDescription() {
        this.setState({
            description: document.getElementById("playlist-description").value,
        });
    }

    updateInspiration() {
        const selection = document.getElementById("playlist-inspiration").selectedIndex;
        this.setState({
            inspiration: document.getElementById("playlist-inspiration").options[selection].value,
        });
    }

    async handleGenerate(event) {
        event.preventDefault();
        this.setState({
            status: "Generating"
        })
        let generatedSongs = await this.generate(this.state.description, this.state.inspiration);

        this.setState({
            status: "Matching"
        })
        let matchingSongs = await Spotify.findMatchingSongs(this.props.token, generatedSongs);

        this.setState({
            status: "Creating"
        })
        let draftPlaylist = await Server.createPlaylist(this.props.user._id, matchingSongs);

        this.props.addDraft(draftPlaylist);
        this.setState({
            draftID: draftPlaylist._id,
        })
    }

    async generate() {
        let inspirationSongs = await Spotify.getPlaylistSongs(this.props.token, this.state.inspiration);
        inspirationSongs = this.parseSongs(inspirationSongs);
        return await Server.generateSongs(10, inspirationSongs, this.state.description);
    }

    parseSongs(songs) {
        return songs.map(song => {
            return `'${song.title}' by ${song.artist}`
        });
    }

    renderStatus() {
        switch(this.state.status) {
            case "Generating":
                return (
                    <div className="searchbar-status">
                        <p>Generating song recommendations ... </p>
                    </div>
                );
            case "Matching":
                return (
                    <div className="searchbar-status">
                        <p>Matching with</p>
                        <img src={SpotifyLogo} alt="Spotify logo"/>
                        <p>...</p>
                    </div>
                );
            case "Creating":
                return (
                    <div className="searchbar-status">
                        <p>Creating playlist ... </p>
                    </div>
                );
            default:
                return;
        }
    }

    render() {
        if(!this.state.draftID) {
            if(!this.state.status) {
                return (
                    <div className="searchbar-full-container">
                        <div className="searchbar-container">
                            <p>Make me a</p>
                            <input onChange={this.updateDescription} id="playlist-description" type="text"/>
                            <p>playlist based on</p>
                            <select onChange={this.updateInspiration} name="playlist-inspiration" id="playlist-inspiration">
                                {this.props.userPlaylists.map(playlist => {
                                    return <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
                                })}
                            </select>
                            <img onClick={this.handleGenerate} src={Arrow} alt="arrow forward"/>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="searchbar-status-container">
                        {this.renderStatus()}
                        <img className="loading-icon" src={Loading} alt="loading icon"/>
                    </div>
                )
            }
        } else {
            return <Navigate to={`/draft/${this.state.draftID}`}/>
        }
    }
}

export default SearchBar;