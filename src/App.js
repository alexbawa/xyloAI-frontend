import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginHandler from "./pages/LoginHandler/LoginHandler";
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: null,
    }

    this.updateUser = this.updateUser.bind(this);
    this.updateToken = this.updateToken.bind(this);
  }

  updateUser(newUser) {
    this.setState({user: newUser})
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
          <Route path="/dashboard" element={<Dashboard user={this.state.user}/>}/>
          <Route path="/loginHandler/" element={<LoginHandler user={this.state.user} updateUser={this.updateUser} updateAuth={this.updateToken}/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
