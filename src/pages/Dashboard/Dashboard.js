import React from "react";
import { Navigate } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.updateAuth({token: null, timeout: null});
    }

    render() {
        if(this.props.token) {
            return (
                <div className="page-container">
                    <p>This is the dashboard page for da User</p>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            );
        } else {
            return <Navigate to="/"/>
        }
        
    }
}

export default Dashboard;
