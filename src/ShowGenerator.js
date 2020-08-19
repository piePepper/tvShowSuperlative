import React, { Component } from "react";
import CardDisplay from "./CardDisplay";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./App.css";

//todo Need to bring dropdown info from sidebar and sort displayArray prior to render.

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

    apiHandler() {
        this.state.query === ''
        ?
            axios({
                url: 'https://api.tvmaze.com/shows'
            })
            .then((response) => {
                this.setState({
                    apiData: response.data,
                    displayArray: response.data
                }, () => {this.sortThis(this.state.displayArray);this.sortThisAgain(this.state.displayArray)}); 
            })
        :
            axios({
                url: `http://api.tvmaze.com/search/shows?q=${this.state.query}`
            })
            .then((response) => {
                this.setState({
                    apiData: response.data.map( (each) => {
                        return each.show;}),
                    displayArray: response.data.map( (each) => {
                        return each.show;})
                }, () => {this.sortThisAgain(this.state.apiData)});
            })
    }

    sortThis = (data) => {
        let sortArray = data;
        sortArray.sort((a, b) => {
            return b.rating.average - a.rating.average
        });
        console.log(sortArray.map((each)=> { return each.rating.average}));
    }

    sortThisAgain = (data) => {
        // console.log('im called')
        let testArray = data;
        testArray.sort((a,b)=> ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1) * -1)
        // console.log(testArray);
        this.setState({
            displayArray: testArray,
        })
    }

    componentDidMount() {
        this.apiHandler();
    }

    setSearch = (queryFromSidebar) => {
        this.setState({
            query: queryFromSidebar,
        }, () => this.apiHandler())
    }

    filterData() {
        let data = this.state.apiData
        this.state.filterArray.forEach((filterItem) => {
            let [word, filter, extra] = filterItem;
            const recursiveFilter = (recursedArray) => {
                data =  recursedArray.filter((each) => {
                    if( extra !== undefined) {
                        if (each[filter] === null ||
                            each[filter] === undefined ||
                            each[filter][extra] === null || 
                            each[filter][extra] === undefined)
                        {}
                        else if(each[filter][extra].includes(word)) {
                                return each
                        }
                    }
                    else if(each[filter] !== null &&
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
    setFilterArray = (arrayFromSidebar) => {
        let setArray = arrayFromSidebar.filter((each) => {
            if(each[0] !== '')
                return each
        })
        this.setState({
            filterArray: setArray,
        }, () => this.filterData())
    }

    render() {
        return (
            <div className="App">
                <Sidebar chosenFilters={this.state.chosenFilters} apiData={this.state.apiData} bringItOnBack={this.setFilterArray} searchPass={this.setSearch} />
                <CardDisplay data={this.state.displayArray} />
            </div>
        );
    }
}

export default ShowGenerator;