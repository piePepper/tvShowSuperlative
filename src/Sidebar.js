import React, { Component } from "react";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      searchBar: "",
      filters: [],
      returnFilter: [
        ["", "language"],
        ["", "genres"],
        ["", "status"],
        ["", "network", "name"],
      ],
      sortArray: [
        ["A-Z", "name", "1"],
        ["Z-A", "name", "-1"],
        ["Highest Rated", "rating", "1"],
        ["Lowest Rated", "rating", "-1"],
      ],
    };
  }

  //this ugly behemoth of a function is designed to scour all the data from our
  //returned api call and dynamically add any unique results to the filter options on the left.
  //we have to setup state before hand, but by adding a new filter to chosenFilter we can
  //automatically create a list of filter terms for any api result.
  //Given time this could clearly be refactored, but it was one of the first functions created, and
  //didn't have time to look back.
  //Rather than have if/else for subke === undefined, I would likely make a single statement that
  //created the appropriate variable for all 4 if/else situations below.
  //doing so, I could use a single null || undefined statement to fill the filter lists.
  //anyways, if wishes were horses...
  createFilterArrays = (response) => {
    let tempFilters = [];
    this.props.chosenFilters.forEach((each, index) => {
      let tempArray = [];
      let [key, subKey] = each;
      if (subKey === undefined) {
        response.forEach((single) => {
          if (single[key] === null || single[key] === undefined) {
          } else if (single[key].constructor === Array) {
            single[key].forEach((nestedValue) => {
              if (!tempArray.includes(nestedValue)) tempArray.push(nestedValue);
            });
          } else if (!tempArray.includes(single[key])) {
            tempArray.push(single[key]);
          }
        });
      } else {
        response.forEach((single) => {
          if (
            single[key] === null ||
            single[key] === undefined ||
            single[key][subKey] === null ||
            single[key][subKey] === undefined
          ) {
          } else if (single[key][subKey].constructor === Array) {
            single[key][subKey].forEach((nestedValue) => {
              if (!tempArray.includes(nestedValue)) tempArray.push(nestedValue);
            });
          } else if (!tempArray.includes(single[key][subKey])) {
            tempArray.push(single[key][subKey]);
          }
        });
      }
      tempFilters.push([tempArray.sort(), [key], [subKey]]);
    });
    this.setState({
      filters: tempFilters,
    });
  };

  //anytime the props change, fire the createFilters array so we always
  //have up to date options in our filters.
  componentDidUpdate(previousProps, previousState) {
    if (previousProps.apiData !== this.props.apiData) {
      this.createFilterArrays(this.props.apiData);
    }
  }

  //this creates and returns to ShowGenerator, the array used
  // to filter the displayed results on the main page.
  dropHandler = (event) => {
    let tempArray = this.state.returnFilter;
    event.target.value === ""
      ? (tempArray[event.target.id][0] = "")
      : (tempArray[event.target.id][0] = event.target.value);
    this.setState(
      {
        returnFilter: tempArray,
      },
      () => this.props.bringItOnBack(this.state.returnFilter)
    );
  };

  //takes search value and sets it on change ready to be sent back
  //for our API to use in ShowGenerator.
  searchHandler = (event) => {
    this.setState({
      searchBar: event.target.value,
    });
  };

  //pass back the sorting information to ShowGenerator.
  //it's a string with a comma that separates two values,
  //so split on the comma and return to two values we want.
  sortHandler = (event) => {
    this.props.sortPass(event.target.value.split(","));
  };

  //send back searchBar values to ShowGenerator to use.
  sideBarData = (event) => {
    event.preventDefault();
    this.props.searchPass(this.state.searchBar);
  };

  render() {
    return (
      <div className="queryContainer">
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={this.searchHandler}
            className="searchBox"
          />
          <button className="sideBarSearchBtn" onClick={this.sideBarData}>
            Search{" "}
          </button>
        </form>
        <form className="criteriaContainer">
          {this.state.filters.map((row, index) => {
            return (
              <>
                <label className="languageContainer">{row[1]}</label>
                <select id={index} name={row[1]} onChange={this.dropHandler}>
                  <option value=""></option>
                  {this.state.filters[index][0].map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
                </select>
              </>
            );
          })}
          <label className="sortByContainer">Sort By</label>
          <select id="sortBy" name="sortBy" onChange={this.sortHandler}>
            <option value=""></option>
            {this.state.sortArray.map((each) => {
              return <option value={[each[1], each[2]]}>{each[0]}</option>;
            })}
          </select>
        </form>
      </div>
    );
  }
}

export default SideBar;
