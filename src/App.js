import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import SideBar from "./SideBar";
import BodyDisplay from "./CardDisplay";
import CardGridDisplay from "./CardGridDisplay";
import MovieGenerator from './MovieGenerator'
import axios from "axios";
import firebase from "./firebase";
import ListSelection from './ListSelection';
import { BrowserRouter as Router, Route }from "react-router-dom";

class App extends Component {

// CC read this. Add route after the axios call is destructured
  getListNameThenAddToDatabase = () => {
    const listName = prompt("Enter List Name")
    const dbRef = firebase.database().ref()
    dbRef.push(listName) 
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>Test PiePepper</h1>
            <button onClick={this.getListNameThenAddToDatabase}>Create List</button>
          </header>
          <TvShowCard
            title="Girls"
            img="fikjsklfjksd"
            alt="img is broken"
            network="HBO"
            country="India"
            genre="Comedy"
            description="Must watch"
          />
          <ListSelection />
        </div>
      </Router>
    )
  }
}
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

export default App;
