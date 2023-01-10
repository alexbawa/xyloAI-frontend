import React from "react";
import { Navigate } from "react-router-dom";
import Server from "../../util/server";
import Spotify from "../../util/spotify";
import Arrow from "./assets/arrow_forward.png"
import "./SearchBar.scss";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            inspiration: this.props.userPlaylists[0].id,
            draftID: null,
        }

        this.updateDescription = this.updateDescription.bind(this);
        this.updateInspiration = this.updateInspiration.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
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
        if(this.state.inspiration) {
            let generatedSongs = await this.generate(this.state.description, this.state.inspiration);
            let matchingSongs = await Spotify.findMatchingSongs(this.props.token, generatedSongs);
            let draftPlaylist = await Server.createPlaylist(this.props.user._id, matchingSongs);
            this.props.addDraft(draftPlaylist);
            this.setState({
                draftID: draftPlaylist._id,
            })
        } else {
            alert("Please configure all playlist options.")
        }
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

    render() {
        if(!this.state.draftID) {
            return (
                <div className="searchbar-full-container">
                    <div className="searchbar-container">
                        <p>Make me a</p>
                        <input onChange={this.updateDescription} id="playlist-description" placeholder="(optional description)" type="text"/>
                        <p>playlist based on</p>
                        <select onChange={this.updateInspiration} name="playlist-inspiration" id="playlist-inspiration">
                            {this.props.userPlaylists.map(playlist => {
                                return <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
                            })}
                        </select>
                        <img onClick={this.handleGenerate} src={Arrow} alt="arrow forward"/>
                    </div>
                    <div className="searchbar-status-container">

                    </div>
                </div>
            );
        } else {
            return <Navigate to={`drafts/${this.state.draftID}`}/>
        }
    }
}

/*
    <div className="searchbar-container">
                    
                </div>
*/

export default SearchBar;