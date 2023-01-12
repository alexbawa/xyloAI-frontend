import React from "react";
import PageMenu from "../../components/PageMenu/PageMenu";
import "./AccountPage.scss";

class AccountPage extends React.Component {
    render() {
        return (
            <div className="page-container">
                <div className="account-top">
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
                <p className="account-content">The <span>Account</span> Page is under construction. Come back soon!</p>
            </div>
        )
    }
}

export default AccountPage