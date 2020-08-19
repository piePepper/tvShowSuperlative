import React, { Component } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import axios from "axios";

class ShowGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            userList: [],
            chosenFilters: [['language'], ['genres'], ['status'], ['network', 'name']],
            apiData: [],
            filterArray: [
                ['','language'],
                ['', 'genres'],
                ['', 'status'],
                ['','network','name'],
            ],
            displayArray: [],
        };
    }

    setFilterArray = (arrayFromSidebar) => {
        this.setState({
            // filterArray: BLAH
        })
    }

    apiHandler() {
        this.state.query === ''
        ?
            axios({
                url: 'https://api.tvmaze.com/shows'
            })
            .then((response) => {
                this.setState({
                    apiData: response.data,
                }, () => this.filterData()); 
            })
        :
            axios({
                url: ` http://api.tvmaze.com/search/shows?q=${this.state.query}`
            })
            .then((response) => {
                this.setState({
                    apiData: response.data.map( (each) => {
                        return each.show;
                    }),
                }, () => this.filterData());
            })
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

    filterData() {
        let data = this.state.apiData
        this.state.filterArray.forEach((filterItem) => {
            let [word, filter, extra] = filterItem;
            const recursiveFilter = (recursedArray) => {
                data =  recursedArray.filter((each) => {
                    if( extra !== undefined) {
                        if (each[`${filter}`] === null ||
                            each[`${filter}`] === undefined ||
                            each[`${filter}`][`${extra}`] === null || 
                            each[`${filter}`][`${extra}`] === undefined)
                        {}
                        else if(each[`${filter}`][`${extra}`].includes(word)) {
                                return each
                        }
                    }
                    else if(each[`${filter}`] !== null &&
                            each[`${filter}`] !== undefined &&
                            each[`${filter}`].includes(word)) {
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

    render() {
        return (
            <div className="App">
                <Sidebar chosenFilters={this.state.chosenFilters} apiData={this.state.apiData} querySetter={this.dropDownValueSetter} />
                {
                    this.state.apiData.map((each) => {
                        return (
                            <>
                                <h3>{each.name}</h3>
                                <h3>{each.rating.average}</h3>
                            </>
                        )
                    })
                }
            </div>
        );
    }
}

export default ShowGenerator;
