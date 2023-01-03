import React from "react";
import { Navigate } from "react-router-dom";
import { AUTH_PATH } from "../../constants";

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.startLogin = this.startLogin.bind(this);
    }

    async startLogin() {
        window.location = AUTH_PATH;
    }

    render() {
        if(!this.props.user) {
            return (
                <div className="page-container">
                    <p>This is the landing page.</p>
                    <button onClick={this.startLogin}>Login</button>
                </div>
            );
        } else {
            return <Navigate to="/dashboard"/>
        }
        
    }
}

export default Landing;
