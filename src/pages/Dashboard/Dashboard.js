import React from "react";
import { Navigate } from "react-router-dom";

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
                    <p>This is the dashboard page for {this.props.user.spotify_email}</p>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            );
        } else {
            return <Navigate to="/"/>
        }
        
    }
}

export default Dashboard;
