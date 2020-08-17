import React, { Component } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import BodyDisplay from "./CardDisplay";
import CardGridDisplay from "./CardGridDisplay";
import axios from "axios";
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

class ShowGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "batman",
            userList: [],
            chosenFilters: [['language'], ['genres'], ['status'], ['network', 'name']],
            apiData: [],
            returnedArray: [
                ['English','language'],
                ['Action', 'genres'],
                ['The CW','network','name'],
            ],
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
                console.log('im in the correct', response)
                this.setState({
                    apiData: response.data,
                }, () => this.filterData()); 
            })
        :
            axios({
                url: ` http://api.tvmaze.com/search/shows?q=${this.state.query}`
            })
            .then((response) => {
                console.log('im in the correct', response)
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
    // componentDidUpdate(previousProps, previousState) {
    //     if (previousState.query !== this.state.query) {
    //         this.apiHandler();
    //     }
    // }

    filterDataNoQuery = (data) => {
        let recursiveArray = []
        this.state.returnedArray.forEach((filterItem) => {
            let [word, filter, extra] = filterItem;
            console.log(word, filter, extra)
            let tempArray =  data.filter((each) => {
                if( extra !== undefined &&
                    each[`${filter}`] !== null &&
                    each[`${filter}`] !== undefined) {
                    if (each[`${filter}`][`${extra}`] !== null &&
                        each[`${filter}`][`${extra}`] !== undefined &&
                        each[`${filter}`][`${extra}`].includes(word)) {
                    return each
                    }
                    else {}
                }
                else if (each[`${filter}`] !== null &&
                        each[`${filter}`] !== undefined &&
                        each[`${filter}`].includes(word)) {
                    return each
                }
                else {}
            })
            console.log(tempArray);
            recursiveArray = tempArray;
        })
        console.log(recursiveArray)
    }

    // Create a function to filter data - Inside the function take 1 parameter. That parameter have to filter api data from that parameter tie in with searchQueryHandler return.
    // Created two keys apiData and Filtered Data. apiData is base that comes from Api and filteredData is filtered based on dropDown adn will display UI.
    //! re-enable this
    filterData() {
        this.state.query === ''
        ?
            this.filterDataNoQuery(this.state.apiData)
        :
            this.filterDataQuery(this.state.apiData);
    }
    //! re-enable this

    //Connect changeQueryHandler from Sidebar Componenet
    onChangeQueryHandler = (changeQuery) => {
        this.setState({
            query: changeQuery
        });
    };

    render() {
        return (
            <div className="App">
                {/* <Sidebar query={this.state.query} chosenFilters={this.state.chosenFilters} apiData={this.state.apiData} querySetter={this.dropDownValueSetter} /> */}
                {
                    this.state.apiData.map((each) => {
                        return (
                            <>
                                <h3>{each.name}</h3>
                                {/* <h3>{each.rating.average}</h3> */}
                            </>
                        )
                    })
                }
                {/* {
                displayData.map((card) => {
                    return(
                        <div className="cardContainer">
                            <img src={card.show.image && card.show.image.medium} />
                            <h2> {card.show.rating.average}</h2>
                            <h3>{card.show.name}</h3>
                        </div>
                    )
                })
                } */}
            </div>
        );
    }
}

export default ShowGenerator;
