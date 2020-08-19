import React, { Component } from "react";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      returnFilter: [[],[],[],[]],
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
      tempFilters.push([tempArray.sort(),[key],[subKey]])
    })
    this.setState({
      filters: tempFilters,
    })
  }

  changeHandler = (event) => {
    let tempArray = this.state.returnFilter;
    (event.target.value === '') 
    ?
      tempArray[`${event.target.id}`] = []
    : 
      tempArray[`${event.target.id}`] = [event.target.value,event.target.name]
    console.log(tempArray)
    this.setState({
      returnFilter: tempArray
    }, () => console.log(this.state.returnFilter));
  };

  sideBarData = () => {
    //   this function will change state of query in parent component
    this.props.onChangeQueryHandler(this.state.searchQuery);
  };
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Search" value={this.state.searchQuery} onChange={this.searchQueryHandler}/>
        <button className="sideBarSearchBtn" onClick={this.sideBarData}>Search</button>
        </form>
        <form>
          {
            this.state.filters.map((row,index) => {
              return(
                <>
                <label>
                  {`${row[1]}`}
                </label>
                <select id={`${index}`} name={`${row[1]}`} onChange={this.changeHandler}>
                  <option value=''></option>
                  {
                    this.state.filters[index][0].map( (each) => {
                      return (
                        <option value={`${each}`}>{`${each}`}</option>
                      )
                    })
                  }
                </select>
                </>
              )
            })
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


  //   Language
  // {/* use map to get this */}
  // <select value={this.state.genre} onChange={this.genreHandler}>
  //   <option value="Any">Any</option>
  //   <option value="Action">Action</option>
  //   <option value="Adventure">Adventure</option>
  //   <option value="Anime">Anime</option>
  //   <option value="Comedy">Comedy</option>
  //   <option value="Drama">Drama</option>
  //   <option value="Family">Family</option>
  //   <option value="Romance">Romance</option>
  // </select> */