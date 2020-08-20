import React, { Component } from "react";
import ListSelection from './ListSelection';
import CardDisplay from "./CardDisplay";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./styles/styles.scss";

class ShowGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            chosenFilters: [['language'], ['genres'], ['status'], ['network', 'name']],
            apiData: [],
            filterArray: [],
            displayArray: [],
        };
    }

    //apiHandler handles the axios calls and returns an array of results by default
    //it will also be called anytime query is updated from the search bar, and
    // all results returned dynamically, of course.
    apiHandler() {
        this.state.query === ''
            ?
            axios({
                url: 'https://api.tvmaze.com/shows'
            }).then((response) => {
                this.setState({
                    apiData: response.data,
                    displayArray: response.data
                });
            })
            :
            axios({
                url: `http://api.tvmaze.com/search/shows?q=${this.state.query}`
            }).then((response) => {
                this.setState({
                    apiData: response.data.map((each) => {
                        return each.show;
                    }),
                    displayArray: response.data.map((each) => {
                        return each.show;
                    })
                });
            })
    }

    //when page loads, fire the api to get some results immediately
    componentDidMount() {
        this.apiHandler();
    }

    //take the input from the search bar and set the state in ShowGenerator
    //so the results can be update and will show.
    setSearch = (queryFromSidebar) => {
        this.setState({
            query: queryFromSidebar,
        }, () => this.apiHandler())
    }

    //this filter will loop through a list of returned filters (any drop down value the user has set)
    //and apply them recursively to the list of shows to be displayed.
    //this funciton could be cleaned up by likely using the extra word defined/undefined to 
    //set a var so that there are fewer if statements, but we ran out of time. This is something I would like to
    //go back and refactor.
    //we hit some nulls/undefined at times in our data, so we need to error handle here in this function.
    filterData() {
        let data = this.state.apiData
        this.state.filterArray.forEach((filterItem) => {
            let [word, filter, extra] = filterItem;
            const recursiveFilter = (recursedArray) => {
                data = recursedArray.filter((each) => {
                    if (extra !== undefined) {
                        if (each[filter] === null ||
                            each[filter] === undefined ||
                            each[filter][extra] === null ||
                            each[filter][extra] === undefined) { }
                        else if (each[filter][extra].includes(word)) {
                            return each
                        }
                    }
                    else if (each[filter] !== null &&
                        each[filter] !== undefined &&
                        each[filter].includes(word)) {
                        return each
                    }
                })
            }
            recursiveFilter(data);
        })
        this.setState({
            displayArray: data,
        })
    }

    //taking a returned array from sidebar, and filtering it so that any index
    //that doesn't have the a value in index 0 is not put into the array as it
    // doesn't have an appropriate value for the filterData function that is called
    // as it was not set by user.
    //this will fire anytime a user updates their filters, and automatically filter the
    //displayed results.
    setFilterArray = (arrayFromSidebar) => {
        let setArray = arrayFromSidebar.filter((each) => {
            if (each[0] !== '')
                return each
        })
        this.setState({
            filterArray: setArray,
        }, () => this.filterData())
    }

    //this sorts any numerical rating that we decide to add a filter for
    // the order argument can be set to 1 or -1 to allow for reversing the order
    // returned.
    ratingSort = (order) => {
        let sortArray = this.state.displayArray;
        sortArray.sort((a, b) => {
            return ((b.rating.average > a.rating.average) ? 1 : -1) * order
        });
        this.setState({
            displayArray: sortArray,
        })
    }

    //this sorts any name rating that we decide to add a filter for
    // the order argument can be set to 1 or -1 to allow for reversing the order
    // returned.
    nameSort = (order) => {
        let sortArray = this.state.displayArray;
        sortArray.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1) * order)
        this.setState({
            displayArray: sortArray,
        })
    }

    //decide which sort to fire based on the data returned.
    //this is a brute force type approach, there is probably a nicer way to implement a sort
    //that doesn't require firing different sort functions, but we couldn't do it in time. 
    sortFunc = (settings) => {
        settings[0] === 'name' ? this.nameSort(settings[1]) : this.ratingSort(settings[1])
    }

    render() {
        return (
            <div className="showGeneratorContainer">
                <div className="sideBarContainer">
                    <Sidebar chosenFilters={this.state.chosenFilters} apiData={this.state.apiData} bringItOnBack={this.setFilterArray} searchPass={this.setSearch} sortPass={this.sortFunc} />
                    <ListSelection />
                </div>
                <div className="cardDisplayContainer">
                    <CardDisplay data={this.state.displayArray} />
                </div>
            </div>
        );
    }
}

export default ShowGenerator;