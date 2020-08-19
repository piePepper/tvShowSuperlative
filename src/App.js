import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShowGenerator from "./ShowGenerator";
import ListSelection from "./ListSelection";
import TvShowCard from "./TvShowCard";
import firebase from "./firebase";
import "./App.css";
import UserList from "./UserList"

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
          <ListSelection />
          <Route exact path="/" component={ShowGenerator} />
          <Route path="/show/:id" component={TvShowCard} />
          <Route path="/list/:listid" component={UserList} />
        </div>
      </Router>
    );
  }
}

export default App;
