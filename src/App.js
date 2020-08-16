import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import axios from "axios";
import Firebase from './Firebase';
import ListSelection from './ListSelection';


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




  render() {
    return (
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
    );
  }
}

export default App;
