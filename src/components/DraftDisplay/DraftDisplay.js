import React from "react";
import DraftBasic from "../DraftBasic/DraftBasic";
import "./DraftDisplay.scss"

class DraftDisplay extends React.Component {
    render() {
        return (
            <div className="draft-component">
                <h1>Drafts</h1>
                <div className="draft-container">
                    {this.props.drafts.map(draft => {
                        return <DraftBasic key={draft._id} draft={draft}/>
                    })}
                </div>
            </div>
        )
        
    }
}

export default DraftDisplay