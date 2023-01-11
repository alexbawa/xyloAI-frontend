import React from "react";
import PageMenu from "../../components/PageMenu/PageMenu";
import "./DraftsPage.scss";

class DraftsPage extends React.Component {
    render() {
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
                <p className="drafts-content">The <span>Drafts</span> Page is under construction. Come back soon!</p>
            </div>
        )
    }
}

export default DraftsPage