import React from "react";
import SongDisplay from "../SongDisplay/SongDisplay";
import "./SongList.scss"

class SongList extends React.Component {
    render() {
        return (
            <div className="song-list">
                {this.props.songs.map(song => {
                    return <SongDisplay key={song.id} url={song.url} title={song.title} album={song.title} cover_art={song.cover_art} artists={song.artists}/>
                })}
            </div>
        )
    }
}

export default SongList;