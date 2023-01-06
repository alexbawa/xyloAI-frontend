import React from "react";
import { Navigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

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
                    <SearchBar token={this.props.token} user={this.props.user} userPlaylists={this.props.userPlaylists}/>
                </div>
            );
        } else {
            return <Navigate to="/"/>
        }
        
    }
}

export default Dashboard;
