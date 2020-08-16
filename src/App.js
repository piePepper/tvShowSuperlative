import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import SideBar from "./SideBar";
import BodyDisplay from "./CardDisplay";
import CardGridDisplay from "./CardGridDisplay";
import MovieGenerator from './MovieGenerator'
import axios from "axios";
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

class App extends Component {


  render() {
    return (
      <div className="App">
        <h1>neatFlix</h1>
      </div>
    );
  }
}

export default App;
