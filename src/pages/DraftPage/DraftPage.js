import React from "react";
import { Navigate } from "react-router-dom";
import Spotify from "../../util/spotify";
import Server from "../../util/server";
import EditIcon from "./assets/edit.png";
import SaveIcon from "./assets/save.png";
import SpotifyWhite from "./assets/spotify-white.png";
import SongList from "../../components/SongList/SongList";
import PageMenu from "../../components/PageMenu/PageMenu";
import "./DraftPage.scss";

class DraftPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.location.pathname.split("/")[2],
            name: null,
            songs: [],
            editing: false,
        }

        this.updateName = this.updateName.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.startEditing = this.startEditing.bind(this);
        this.saveEdits = this.saveEdits.bind(this);
        this.publishDraft = this.publishDraft.bind(this);
    }

    async componentDidMount() {
        let playlist = this.props.user.drafts.find(draft => {
            return draft._id === this.state.id
        });
        let songs = await Spotify.batchGetSongsByID(this.props.token, playlist.song_ids);
        this.setState({
            songs,
            name: playlist.name
        });
    }

    updateName() {
        this.setState({
            name: document.getElementById("playlist-input").value,
        });
    }

    startEditing(event) {
        event.preventDefault();
        this.setState({
            editing: true,
        })
    }

    async saveEdits(event) {
        event.preventDefault();
        await Server.updatePlaylistName(this.props.user._id, this.state.id, this.state.name);
        this.props.updateDraftName(this.state.id, this.state.name);
        this.setState({
            editing: false,
        })
    }

    async publishDraft(event) {
        event.preventDefault();
        let playlist = await Server.publishPlaylist(this.props.user._id, this.state.id, this.props.token);
        console.log(playlist.external_urls.spotify);
    }

    renderHeader() {
        if(!this.state.editing) {
            return (
                <div className="draft-header">
                    <p className="draft-title">{this.state.name}</p>
                    <img onClick={this.startEditing} src={EditIcon} alt="edit button"/>
                </div>
            )
        } else {
            return (
                <div className="draft-header">
                    <input id="draft-input" onChange={this.updateName} className="draft-title draft-input" type="text" value={this.state.name}/>
                    <img onClick={this.saveEdits} src={SaveIcon} alt="save button"/>
                </div>
            )
        }
    }

    render() {
        if(this.props.user) {
            return (
                <div className="page-container">
                    <div className="draft-top">
                        <PageMenu pages={[
                            {
                                url: "/",
                                name: "Home",
                            },
                            {
                                url: "/generate",
                                name: "Generate",
                            },
                            {
                                url: "/drafts",
                                name: "Drafts",
                            },
                            {
                                url: "/account",
                                name: "Account",
                            },
                        ]}/>
                    </div>
                    {this.renderHeader()}
                    <SongList songs={this.state.songs}/>
                </div>
            )
        } else {
            return <Navigate to="/"/>
        }
        
    }
}

/*
return (
            <div className="page-container">
                
                
                <SongList songs={this.state.songs}/>
            </div>
        )
*/

export default DraftPage;