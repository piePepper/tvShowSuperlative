import React, { Component } from "react";

// Componnent for Search Side Bar. Will allow user to sear

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      // genreArray: ['Action','Adventure','Anime','Children','Comedy','Crime','DIY','Drama','Espionage','Family','Fantasy','Food','History','Horror','Legal', 'Medical','Musical','History','Nature','Romance','Science-Fiction','Sports','Supernatural','Thriller','Travel','War','Western'],
      // showStatus: ['Running','Ended','To Be Determined','In Development'],
      // language: ['Chinese','Dutch','English','French','Italian','Latin','Urdu'],
      searchQuery: "",
      genre: "",
    };
  }

  // first change for value of input box
  // 2nd change for changing the query request of Api

  searchQueryHandler = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };



  // getfiltered data is on App.js
  genreHandler = (event) => {
    this.setState({
      genre: event.target.value,
    });
    this.props.getFiltereddata(event.target.value);
  };

  sideBarData = () => {
    //   this fucntion will change state of query in parent component
    this.props.onChangeQueryHandler(this.state.searchQuery);
  };
  render() {
    return (
      <div className="SideBar">
        <form className="SideBarForm">
          <input
            className="searchQuery"
            type="text"
            placeholder="Search"
            value={this.state.searchQuery}
            onChange={this.searchQueryHandler}
          />
          <label>
            Genre
            {/* use map to get this */}
            <select value={this.state.genre} onChange={this.genreHandler}>
              <option value="Any">Any</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Anime">Anime</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Family">Family</option>
              <option value="Romance">Romance</option>
            </select>
          </label>
        </form>
        {/* Creating clickhanlder through sideBarData that will send data to the parent --> App.js */}
        <button className="sideBarSearchBtn" onClick={this.sideBarData}>
          Search
        </button>
      </div>
    );
  }
}

export default SideBar;
