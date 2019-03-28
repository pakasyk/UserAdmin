import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./partials/Navbar";
import Home from "./HomePage";
import Users from "./UsersPage";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="container-fluid no-gutters">
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Route exact path="/" component={Home} />
            <Route exact path="/Users" component={Users} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
