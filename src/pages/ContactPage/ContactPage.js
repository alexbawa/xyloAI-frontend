import React from "react";
import PageMenu from "../../components/PageMenu/PageMenu";
import "./ContactPage.scss";

class ContactPage extends React.Component {
    render() {
        return (
            <div className="page-container">
                <div className="contact-top">
                    <PageMenu pages={[
                        {
                            url: "/",
                            name: "Home"
                        },
                        {
                            url: "/about",
                            name: "About"
                        },
                        {
                            url: "/contact",
                            name: "Contact"
                        },
                    ]}/>
                </div>
                <p className="contact-content">The <span>Contact</span> Page is under construction. Come back soon!</p>
            </div>
        )
    }
}

export default ContactPage