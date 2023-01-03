import React from "react";
import { Navigate } from "react-router-dom";

class LoginHandler extends React.Component {
    componentDidMount() {
        const token = window.location.href.match(/access_token=([^&]*)/)[1];
        const timeout = window.location.href.match(/expires_in=([^&]*)/)[1];
        this.props.updateAuth({token, timeout});
    }

    render() {
        if(this.props.token) {
            return <Navigate to="/dashboard"/>
        } else {
            return (
                <div className="page-container">
                    <p>Communicating with Spotify ... </p>
                </div>
            )
        }
    }
}

export default LoginHandler;