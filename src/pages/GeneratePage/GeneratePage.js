import React from "react";
import { Navigate } from "react-router-dom";
import PageMenu from "../../components/PageMenu/PageMenu";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./GeneratePage.scss";

class GeneratePage extends React.Component {
    render() {
        if(this.props.user) {
            return (
                <div className="page-container">
                    <div className="dashboard-top">
                        <PageMenu pages={[
                            {
                                url: "/",
                                name: "Home",
                            },
                            {
                                url: "/generate",
                                name: "Generate",
                            },
                            {
                                url: "/drafts",
                                name: "Drafts",
                            },
                            {
                                url: "/account",
                                name: "Account",
                            },
                        ]}/>
                    </div>
                    <SearchBar addDraft={this.props.addDraft} token={this.props.token} user={this.props.user} userPlaylists={this.props.userPlaylists}/>
                </div>
            );
        } else {
            return <Navigate to="/"/>
        }
        
    }
}

export default GeneratePage;
