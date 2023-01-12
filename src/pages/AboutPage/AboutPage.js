import React from "react";
import PageMenu from "../../components/PageMenu/PageMenu";
import "./AboutPage.scss";

class AboutPage extends React.Component {
    render() {
        return (
            <div className="page-container">
                <div className="about-top">
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
                <p className="about-content">The <span>About</span> Page is under construction. Come back soon!</p>
            </div>
        )
    }
}

export default AboutPage