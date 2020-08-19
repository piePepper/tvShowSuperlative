import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShowGenerator from "./ShowGenerator";
import ListSelection from "./ListSelection";
import TvShowCard from "./TvShowCard";
import "./App.css";

class App extends Component {
  // CC read this. Add route after the axios call is destructured

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>PiePepper</h1>
          </header>
          <ListSelection />
          <Route exact path="/" component={ShowGenerator} />
          <Route path="/show/:id" component={TvShowCard} />
        </div>
      </Router>
    );
  }
}

export default App;
