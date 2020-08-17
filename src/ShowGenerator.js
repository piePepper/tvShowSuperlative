import React, { Component } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import BodyDisplay from "./CardDisplay";
import CardGridDisplay from "./CardGridDisplay";
import axios from "axios";
// import Firebase from "./Firebase";
// import ListSelection from "./ListSelection";

class ShowGenerator extends Component {
    constructor() {
        super();
        this.state = {
            query: "batman",
            userList: [],
            chosenFilters: [['language'], ['genres'], ['status'], ['network', 'name']],
            apiData: [],
            filteredData: [],
        };
    }

    apiHandler() {
        console.log(this.state.query)
        this.state.query === ''
        ?
            axios({
                url: 'https://api.tvmaze.com/shows'
            })
            .then((response) => {
                this.setState({
                    apiData: response.data,
                    filteredData: response.data
                }, ()=>{
                    console.log('im calling no query filterarray', response.data);
                    this.createFilterArrays(this.state.apiData); 
                    console.log('im set this one')});
            })
        :
            axios({
                url: ` http://api.tvmaze.com/search/shows?q=${this.state.query}`
            })
            .then((response) => {
                this.setState({
                    apiData: response.data,
                    filteredData: response.data
                }, ()=>{
                    console.log('im calling query filterarray', response.data);
                    this.createFilterArrays(this.state.apiData); 
                    console.log('Im set that one')});
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


    //! hissssss don't look at me, I'm hideous!
    // its not my fault though, it's the apis fault
    // and the fact that the two endpoints return different objects.
    // this should likely be broken into it's own function component
    // it returns some state, because this is ugly as fuck
    createFilterArrays = (response) => {
        let keyArray = [];
        let counter = 0;
        this.state.chosenFilters.forEach((each) => {
            console.log(this.state)
            let [key, subKey] = each;
            let tempArray = [];
            keyArray.push([`${key}Array`])
            this.setState({
                [`${key}Array`]: [],
            },() =>{console.log('i shouldbe setting state', this.state)});
            console.log(key,subKey);
            if(subKey === undefined){              
                if (this.state.query === '') {
                    response.forEach((single) => {
                        if (single[`${key}`] === null || single[`${key}`] === undefined) {
                        }
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
                        console.log('single no sub',single);
                        if (single.show[`${key}`] === null || single.show[`${key}`] === undefined) {
                        }
                        else if (single.show[`${key}`].constructor === Array) {
                            single.show[`${key}`].forEach((nestedValue) => {
                                console.log(nestedValue);
                                if (!tempArray.includes(nestedValue))
                                    tempArray.push(nestedValue)
                            })
                        }
                        else if (!tempArray.includes(single[`${key}`])) {
                            tempArray.push(single[`${key}`])
                        }
                    })
                }
            }
            else {
                if (this.state.query === '') {
                    response.forEach((single) => {
                        if (single[`${key}`] === null || single[`${key}`] === undefined)  {
                        }
                        else if (!tempArray.includes(single[`${key}`][`${subKey}`])) {
                            tempArray.push(single[`${key}`][`${subKey}`])
                        }
                    })
                }
                else {
                    response.forEach((single) => {
                        console.log('single sub',single);
                        if (single.show[`${key}`] === null || single.show[`${key}`] === undefined)  {
                        }
                        else if (!tempArray.includes(single.show[`${key}`][`${subKey}`])) {
                            console.log(single.show[`${key}`][`${subKey}`]);
                            tempArray.push(single.show[`${key}`][`${subKey}`])
                        }
                    })
                }
            }

            this.setState({
                [`${key}Array`]: tempArray.sort()
            })
            counter++;
            console.log(counter);
        })
        console.log('here', this.state)
    }



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

    // Create a function to filter data - Inside the function take 1 parameter. That parameter have to filter api data from that parameter tie in with searchQueryHandler return.
    // Created two keys apiData and Filtered Data. apiData is base that comes from Api and filteredData is filtered based on dropDown adn will display UI.
    getFiltereddata(item) {
        const filteredApiData = this.state.apiData.filter((row) => {
            return row.show.genres.includes(item);
        });
        this.setState({ filteredData: filteredApiData });
    }

    //Connect changeQueryHandler from Sidebar Componenet
    onChangeQueryHandler = (changeQuery) => {
        this.setState({
            query: changeQuery
        });
    };

    render() {
        return (
            <div className="App">
                <Sidebar querySetter={this.dropDownValueSetter} />
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
