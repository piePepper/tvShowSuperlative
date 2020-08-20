import React, { Component } from "react";

//todo need to add the sorting dropdown

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

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.apiData !== this.props.apiData) {
      this.createFilterArrays(this.props.apiData);
    }
  }

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

  searchHandler = (event) => {
    this.setState({
      searchBar: event.target.value,
    });
  };

  sortHandler = (event) => {
    this.props.sortPass(event.target.value.split(","));
  };

  sideBarData = (event) => {
    event.preventDefault();
    this.props.searchPass(this.state.searchBar);
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={this.searchHandler}
          />
          <button className="sideBarSearchBtn" onClick={this.sideBarData}>
            Search
          </button>
        </form>
        <form>
          {this.state.filters.map((row, index) => {
            return (
              <>
                <label>{row[1]}</label>
                <select id={index} name={row[1]} onChange={this.dropHandler}>
                  <option value=""></option>
                  {this.state.filters[index][0].map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
                </select>
              </>
            );
          })}
          <label>Sort By</label>
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
