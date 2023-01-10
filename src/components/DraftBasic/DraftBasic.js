import React from "react";
import { Link } from "react-router-dom";
import "./DraftBasic.scss"

class DraftBasic extends React.Component {
    render() {
        return (
            <Link to={`/draft/${this.props.draft._id}`} className="draft">
                <h4 className="draft-name">{this.props.draft.name}</h4>
                <p className="draft-count">{this.props.draft.song_ids.length} songs</p>
            </Link>
        )
    }
}

export default DraftBasic