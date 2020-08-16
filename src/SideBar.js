import React, { Component } from "react";

// Componnent for Search Side Bar. Will allow user to sear

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
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
            <select value={this.state.genre} onChange={this.genreHandler}>
              <option value="">Any</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Family">Family</option>
              <option value="Romance">Romance</option>
              <option value="Action">Action</option>
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
