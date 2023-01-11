import React from "react";
import { Navigate, Link } from "react-router-dom";
import PageMenu from "../../components/PageMenu/PageMenu";
import "./DraftsPage.scss";

class DraftsPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrafts = this.renderDrafts.bind(this);
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    renderDrafts() {
        if(this.props.user.drafts.length === 0) {
            return (
                <p className="empty-message">You have no drafts to display.</p>
            )
        } else {
            return this.props.user.drafts.map(draft => {
                let date = new Date(Date.parse(draft.timestamp));
                let dateString;

                if(this.isToday(date)) {
                    dateString = "Today"
                } else {
                    dateString = `${date.toLocaleDateString()}`
                }

                return (
                    <Link key={draft._id} to={`/draft/${draft._id}`} className="draft">
                        <div>
                            <p className="draft-name">{draft.name}</p>
                            <p className="draft-count">{draft.song_ids.length} songs</p>
                        </div>
                        <p className="draft-timestamp">Created: {dateString}</p>
                    </Link>
                )
            });
        }
    }
    render() {
        if(this.props.user) {
            return (
                <div className="page-container">
                    <div className="drafts-top">
                        <PageMenu pages={[
                            {
                                url: "/",
                                name: "Home"
                            },
                            {
                                url: "/generate",
                                name: "Generate"
                            },
                            {
                                url: "/drafts",
                                name: "Drafts"
                            },
                            {
                                url: "/account",
                                name: "Account"
                            }
                        ]}/>
                    </div>
                    <div className="drafts-display">{this.renderDrafts()}</div>
                </div>
            )
        } else {
            return <Navigate to="/"/>
        }
    }
}

export default DraftsPage