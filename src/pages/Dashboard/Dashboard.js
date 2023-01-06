import React from "react";
import { Navigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import DraftDisplay from "../../components/DraftDisplay/DraftDisplay";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.updateUser(null);
    }

    render() {
        if(this.props.user) {
            return (
                <div className="page-container">
                    <SearchBar addDraft={this.props.addDraft} token={this.props.token} user={this.props.user} userPlaylists={this.props.userPlaylists}/>
                    <DraftDisplay drafts={this.props.user.drafts}/>
                </div>
            );
        } else {
            return <Navigate to="/"/>
        }
        
    }
}

export default Dashboard;
