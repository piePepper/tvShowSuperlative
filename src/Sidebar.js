import React, { Component } from "react";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.apiData !== this.props.apiData) {
      this.createFilterArrays(this.props.apiData);
    }
  }

  createFilterArrays = (response) => {
    let tempFilters = [];
    this.props.chosenFilters.forEach((each,index) => {
      let tempArray = [];
      let [key, subKey] = each;
      console.log(key, subKey);
      if(subKey === undefined){
        response.forEach((single) => {
            if (single[`${key}`] === null || single[`${key}`] === undefined) 
            {}
            else if (single[`${key}`].constructor === Array) {
                single[`${key}`].forEach((nestedValue) => {
                    if (!tempArray.includes(nestedValue))
                        tempArray.push(nestedValue)
                })
            }
            else if (!tempArray.includes(single[`${key}`])) {
                tempArray.push(single[`${key}`])
            }
        })
      }
      else {
        response.forEach((single) => {
            if (single[`${key}`] === null || single[`${key}`] === undefined || single[`${key}`][`${subKey}`] === null || single[`${key}`][`${subKey}`] === undefined)  
            {}
            else if (single[`${key}`][`${subKey}`].constructor === Array) {
              single[`${key}`][`${subKey}`].forEach((nestedValue) => {
                if (!tempArray.includes(nestedValue))
                    tempArray.push(nestedValue)
              })
            }
            else if (!tempArray.includes(single[`${key}`][`${subKey}`])) {
                tempArray.push(single[`${key}`][`${subKey}`])
            }
        })
      }
      // console.log(tempArray.sort());
      this.setState({
      })
    tempFilters.push([tempArray,[key],[subKey]])
    })
    console.log(tempFilters);
    this.setState({
      filters: tempFilters,
    }, () => console.log(this.state.filters))
    
  }

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
                  {/* Creating clickhanlder through sideBarData that will send data to the parent --> App.js */}
        <button className="sideBarSearchBtn" onClick={this.sideBarData}>
          Search
        </button>
        </form>
        <form>
          {

          <label>
            Language
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
          }
        </form>
      </div>
    );
  }
}

export default SideBar;

  //! this might be redudant.
  // sortThis = () => {
  //     let sortArray = this.state.apiData;
  //     sortArray.sort((a, b) => {
  //         return b.rating.average - a.rating.average
  //     });
  //     this.setState({
  //         sortedData: sortArray,
  //     })
  // }
  //!
