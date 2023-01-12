import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.svg";
import "./PageMenu.scss";

class PageMenu extends React.Component {
    render() {
        return (
            <div className="page-menu-container">
                <img src={Logo} className="logo" alt="xyloAI Logo"/>
                <div className="page-menu">
                    {this.props.pages.map(page => {
                        return <Link key={page.name} to={page.url}>{page.name}</Link>
                    })}
                </div>
            </div>
        )
    }
}

export default PageMenu;