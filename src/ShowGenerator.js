import React, { Component } from "react";
import CardDisplay from "./CardDisplay";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./styles/styles.scss";
import ListSelection from './ListSelection';

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
                }, console.log(this.state.displayArray));
            })
    }

    ratingSort = (order) => {
        let sortArray = this.state.displayArray;
        sortArray.sort((a, b) => {
            return ((b.rating.average > a.rating.average) ? 1 : -1) * order
        });
        this.setState({
            displayArray: sortArray,
        })
    }

    nameSort = (order) => {
        let sortArray = this.state.displayArray;
        sortArray.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1) * order)
        this.setState({
            displayArray: sortArray,
        })
    }

    sortFunc = (settings) => {
        settings[0] === 'name' ? this.nameSort(settings[1]) : this.ratingSort(settings[1])
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
    setFilterArray = (arrayFromSidebar) => {
        let setArray = arrayFromSidebar.filter((each) => {
            if (each[0] !== '')
                return each
        })
        this.setState({
            filterArray: setArray,
        }, () => this.filterData())
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