import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(newUser) {
    this.setState({
      user: newUser,
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing updateUser={this.updateUser} user={this.state.user}/>}/>
          <Route path="/dashboard" element={<Dashboard updateUser={this.updateUser} user={this.state.user}/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
