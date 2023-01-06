import React from "react";
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
            generated: false,
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
        if(!this.state.generated) {
            return (
                <div className="searchbar-container">
                    <p>Make me a</p>
                    <input onChange={this.updateDescription} id="playlist-description" placeholder="" type="text"/>
                    <p>playlist based on</p>
                    <select onChange={this.updateInspiration} name="playlist-inspiration" id="playlist-inspiration">
                        {this.props.userPlaylists.map(playlist => {
                            return <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
                        })}
                    </select>
                    <img onClick={this.handleGenerate} src={Arrow} alt="arrow forward"/>
                </div>
            );
        }
        
    }
}

export default SearchBar;