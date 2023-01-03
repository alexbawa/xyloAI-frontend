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
      timeout: null,
    }

    this.updateUser = this.updateUser.bind(this);
    this.updateAuth = this.updateAuth.bind(this);
  }

  updateUser(newUser) {
    this.setState({
      user: newUser,
    })
  }

  updateAuth(newAuth) {
    this.setState(newAuth);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing token={this.state.token}/>}/>
          <Route path="/dashboard" element={<Dashboard updateAuth={this.updateAuth} token={this.state.token}/>}/>
          <Route path="/loginHandler/" element={<LoginHandler token={this.state.token} updateAuth={this.updateAuth}/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
