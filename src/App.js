import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginHandler from "./pages/LoginHandler/LoginHandler";
import DraftPage from "./pages/DraftPage/DraftPage";
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userPlaylists: [],
      token: null,
    }

    this.updateUser = this.updateUser.bind(this);
    this.addDraft = this.addDraft.bind(this);
    this.updateUserPlaylists = this.updateUserPlaylists.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.updateDraftName = this.updateDraftName.bind(this);
  }

  updateUser(newUser) {
    this.setState({user: newUser});
  }

  addDraft(newDraft) {
    let currentUser = this.state.user;
    currentUser.drafts.push(newDraft);
    this.setState({
      user: currentUser
    });
  }

  updateDraftName(playlistID, newName) {
    let currentUser = this.state.user;
    let playlistIndex = currentUser.drafts.findIndex(draft => {
      return draft._id === playlistID
    });
    currentUser.drafts[playlistIndex].name = newName;
    this.setState({
      user: currentUser
    })
  }

  updateUserPlaylists(newPlaylists) {
    this.setState({userPlaylists: newPlaylists});
  }

  updateToken(newToken, timeout) {
    this.setState(newToken);
    setTimeout(() => {alert("Token expired!")}, timeout * 1000);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing user={this.state.user}/>}/>
          <Route path="/dashboard" element={<Dashboard addDraft={this.addDraft} token={this.state.token} userPlaylists={this.state.userPlaylists} user={this.state.user}/>}/>
          <Route path="/draft/:draftID" element={<DraftPage updateDraftName={this.updateDraftName} user={this.state.user} token={this.state.token}/>}/>
          <Route path="/loginHandler/" element={<LoginHandler user={this.state.user} updateUser={this.updateUser} updateUserPlaylists={this.updateUserPlaylists} updateAuth={this.updateToken}/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
