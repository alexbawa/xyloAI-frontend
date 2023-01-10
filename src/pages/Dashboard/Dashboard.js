import React from "react";
import { Navigate } from "react-router-dom";
import PageMenu from "../../components/PageMenu/PageMenu";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Dashboard.scss";

class Dashboard extends React.Component {
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
                                url: "/dashboard",
                                name: "Dashboard",
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

/*
    import DraftDisplay from "../../components/DraftDisplay/DraftDisplay";  
    <div className="page-container">
        
        <DraftDisplay drafts={this.props.user.drafts}/>
    </div>
*/

export default Dashboard;
