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
            sortedArray: [],

        };
    }
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
            })
            this.sortArray()
            this.createUserListDisplay()
        })
    }

    sortArray = () => {
        const unsortedArray = []
        const unsortedObj = this.state.displayListInfo.shows
        for (let shows in unsortedObj) {
            unsortedArray.push({ showID: parseInt(shows), counter: unsortedObj[shows].counter })
        }
        const sortedArray = unsortedArray.sort(function (a, b) {
            return b.counter - a.counter
        })
        const sortedArrayWithID = sortedArray.map(x => x.showID)
        this.setState({
            arrayWithShowIDs: sortedArrayWithID
        })
    }

    counterFunc = (event) => {
        const dbRef = firebase.database().ref(this.props.match.params.listid).child("shows")
        const showID = event.target.getAttribute("showid")
        const myNum = parseInt(event.target.value)
        const origNum = this.state.displayListInfo.shows[showID].counter
        dbRef.child(showID).update({ counter: (origNum + myNum) })
        this.sortArray()
    }
    createUserListDisplay = () => {
        let promiseArray = [];
        this.state.arrayWithShowIDs.forEach((each) => {
            promiseArray.push(axios({ url: `https://api.tvmaze.com/shows/${each}` }))
        })
        Promise.all(promiseArray).then((item) => {
            let storeArray = item.map((each) => { return each.data });
            this.setState({
                displayArray: storeArray,
            })
        });
    }
    render() {
        return (
            <>
                {
                    this.state.displayArray.map((each) => {
                        return (
                            <>
                                {/* {console.log(this.state.displayArray, "CC this is the display array that's mapped")} */}
                                <img className="userListImage" src={each.image === null ? NoImageAvailableLarge : each.image.medium} alt={each.name} />
                                <h4 className='bodyCardRating'>{each.rating.average}</h4>
                                <h3 className='bodyCardTitle'>{each.name}</h3>
                                <button onClick={this.counterFunc} showid={each.id} value={1}> UpVote </button>
                                <button onClick={this.counterFunc} showid={each.id} value={-1}> DownVote </button>
                            </>
                        )
                    })
                }
            </>
        )
    }
}
export default UserList