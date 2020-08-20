import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NoImageAvailableLarge from './images/NoImageAvailableLarge.jpg'
import firebase from "./firebase";
import axios from 'axios'
// import Counter from "./Counter"

class UserList extends Component {
    constructor() {
        super();
        this.state = {
            displayListInfo: {},
            displayArray: [],
            arrayWithShowIDs: [],
            testRender: ['peanuit','walnut','burgernut','blahnut','thisisnuts','dont know','why this is','happening'],
        }
    }
    //Okay, just a tip, once you get your array of tv id's, use a foreach to loop over the array and replace 599 in this endpoint with each show id and push to a temp array:

    componentDidMount() {
        const dbRef = firebase.database().ref(this.props.match.params.listid)
        dbRef.on('value', (snapshot) => {
            const dbReturn = snapshot.val()
            const idArray = []
            for (let objEntry in dbReturn.shows) {
                idArray.push(parseInt(objEntry))
            }
            this.setState({
                displayListInfo: dbReturn,
                arrayWithShowIDs: idArray
            }, () => this.createUserListDisplay())
        })
    }
    //! THIS IS THE USER LIST GENERATOR.
    createUserListDisplay = () => {
        let storeArray = [];
        console.log(Array.isArray(storeArray),typeof(storeArray));
        let promiseArray = [];
        this.state.arrayWithShowIDs.forEach((each) => {
            axios({
                url: `https://api.tvmaze.com/shows/${each}`
            }).then((response) => {
                storeArray.push(response.data)
                promiseArray.push(response);
            });
        })
        Promise.all(promiseArray).then(()=> {
            console.log(typeof(storeArray));
            this.setState({
                displayArray: storeArray,
            }, () => {console.log(this.state.displayArray)});
        });
    }

    render() {
        return (
            <>
            <h1>hellllo</h1>
			{
			this.state.testRender.map((item) => {
				return (
					<div>
                        <h2>{item}</h2>
					</div>
				)
			})
			}
            {
            this.state.displayArray.map((item) => {
                return(
                <>
                    <h1>{item.name}</h1>
                </>
                )
            })
            }
            </>
        )
    }
}

export default UserList