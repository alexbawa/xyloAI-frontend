import React from "react";
import { Navigate } from "react-router-dom";

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.props.updateUser({name: "Me!"})
    }

    render() {
        if(!this.props.user) {
            return (
                <div className="page-container">
                    <p>This is the landing page.</p>
                    <button onClick={this.handleLogin}>Login</button>
                </div>
            );
        } else {
            return <Navigate to="/dashboard"/>
        }
        
    }
}

export default Landing;
