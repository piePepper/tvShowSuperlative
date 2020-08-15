import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import axios from "axios";

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
        <h1>neatFlix</h1>
        <TvShowCard
          title="Girls"
          img="fikjsklfjksd"
          alt="img is broken"
          network="HBO"
          country="India"
          genre="Comedy"
          description="Must watch"
        />
      </div>
    );
  }
}

export default App;
