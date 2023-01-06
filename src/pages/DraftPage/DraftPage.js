import React from "react";
import Spotify from "../../util/spotify";

class DraftPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.location.pathname.split("/")[2],
            songs: [],
        }
    }

    async componentDidMount() {
        let playlist = this.props.user.drafts.find(draft => {
            return draft._id === this.state.id
        });
        let songs = await Spotify.batchGetSongsByID(this.props.token, playlist.songs)
        console.log(songs);
        this.setState({songs});
    }

    render() {
        return (
            <div>
                {this.state.songs.map(song => {
                    return <p key={song.id}>'{song.title}' by {song.artists.join(", ")}</p>
                })}
            </div>
        )
    }
}

export default DraftPage;