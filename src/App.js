import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import SideBar from "./SideBar";
import BodyDisplay from "./CardDisplay";
import ShowGenerator from "./ShowGenerator";
import axios from "axios";
import Firebase from "./Firebase";
import ListSelection from "./ListSelection";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
          {/* <ShowGenerator /> */}
        </div>
      </Router>
    );
  }
}
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

export default App;
