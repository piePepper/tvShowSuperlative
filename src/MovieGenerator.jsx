import React, { Component } from "react";
import "./App.css";
import TvShowCard from "./TvShowCard";
import SideBar from "./SideBar";
import BodyDisplay from "./CardDisplay";
import CardGridDisplay from "./CardGridDisplay";
import axios from "axios";
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

class MovieGenerator extends Component {
    constructor() {
        super();
        this.state = { 
            apiData: [],
            sortedData: [],
            query: "",
            filteredData:[],
            filteredArray: [],
            dropDownValues : [],
            userList: [],
        };
        this.apiHandler.bind(this);
        this.getFiltereddata = this.getFiltereddata.bind(this);
    }

  // This is a function to hold api for for call at didMOunt and didUpdate
  // url: ` http://api.tvmaze.com/search/shows?q=${this.state.query}`,

    apiHandler() {
        axios({
        url: 'https://api.tvmaze.com/shows'
        }).then((response) => {
        this.setState({ 
            apiData: response.data,
            filteredData: response.data
        }, () => this.sortThis());
        })
    }

    sortThis = () => {
        let sortArray = this.state.apiData;
        sortArray.sort( (a, b) => {
        return b.rating.average-a.rating.average
        });
        this.setState({
            sortedData: sortArray,
        })
    }

  // Create a function to filter data - Inside the function take 1 parameter. That parameter have to filter api data from that parameter tie in with searchQueryHandler return.
  // Created two keys apiData and Filtered Data. apiData is base that comes from Api and filteredData is filtered based on dropDown adn will display UI.
    getFiltereddata(item) {
        const filteredApiData = this.state.apiData.filter((row) => {
        return row.show.genres.includes(item);
        });
        this.setState({ filteredData: filteredApiData });
    }

  // Component DidMount occurs only once - cannot update query state
    componentDidMount() {
        this.apiHandler();
    }

  // Updates when setState occurs - takes 2 props previousProps and PreviousStates is a built in funciton
    componentDidUpdate(previousProps, previousState) {
    if (previousState.query !== this.state.query) {
        this.apiHandler();
    }
    } 

  //Connect changeQueryHandler from Sidebar Componenet
    onChangeQueryHandler = (changeQuery) => {
        this.setState({ 
            query: changeQuery 
        });
    };

    render() {
        return (
            <div className="App">
            <h1>neatFlix</h1>
                <SideBar
                    getFiltereddata={this.getFiltereddata}
                    onChangeQueryHandler={this.onChangeQueryHandler}
                />
                <div className="showGrid">
                    <CardGridDisplay data={this.state.filteredData} />
                </div>
            </div>
        );
    }
}

export default MovieGenerator;

//! Matt saving this for testing.
{/* <div className="gridMan">
{
this.state.apiData.map((each) => {
  return(
  <div>
    <h3>{each.name}</h3>
    <h3>{each.rating.average}</h3>
  </div>
  )
})
} */}