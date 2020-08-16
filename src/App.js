import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = { 
      apiData: [], 
      query: "batman",
      filteredArray: [],
      dropDownValues : [],
      userList: [],
    };
  }

  componentDidMount() {
    axios({
      url: 'https://api.tvmaze.com/shows'
    }).then((response) => {
      this.setState({ 
        apiData: response.data, 
      }, () => this.sortThis());
    })
  }

  sortThis = () => {
    let sortArray = this.state.apiData;
    sortArray.sort( (a, b) => {
      return b.rating.average-a.rating.average
    });
    this.setState({
      apiData: sortArray,
    })
  }

  render() {
    return (
      <div className="App">
        <h1>neatFlix</h1>
        <div className="gridMan">
        {
        this.state.apiData.map((each) => {
          return(
          <div>
            <h3>{each.name}</h3>
            <h3>{each.rating.average}</h3>
          </div>
          )
        })
        }
        </div>
      </div>
    );
  }
}

export default App;
