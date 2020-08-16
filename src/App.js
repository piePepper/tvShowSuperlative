import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import axios from "axios";
import Firebase from './Firebase';
import ListSelection from './ListSelection';
import { BrowserRouter as Router, Route }from "react-router-dom";


class App extends Component {
  constructor() {
    super();
    this.state = { apiData: [], query: "batman" };
  }

  componentDidMount() {
    axios({
      url: `http://api.tvmaze.com/search/shows?q=${this.state.query}`,
    }).then((response) => {
      this.setState({ apiData: response.data }, () => {
        console.log(this.state.apiData);
      });
    });

      }


// CC read this. Add route after the axios call is destructured

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>PiePepper</h1>
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
    );
  }
}

export default App;
