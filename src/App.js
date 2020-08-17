import React, { Component } from "react";
import "./App.css";
import ShowGenerator from './ShowGenerator'
import axios from "axios";
import Firebase from './Firebase';
import ListSelection from './ListSelection';
import { BrowserRouter as Router, Route }from "react-router-dom";

class App extends Component {

// CC read this. Add route after the axios call is destructured

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>PiePepper</h1>
          </header>
          <Route exact path="/" component={ ShowGenerator } />
          <ListSelection />
        </div>
      </Router>
    )
  }
}
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

export default App;
