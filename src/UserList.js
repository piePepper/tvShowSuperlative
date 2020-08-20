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
            arrayWithShowIDs: [],
            sortedArray: []
        }
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
                arrayWithShowIDs: idArray
            }, () => this.createUserListDisplay())
        })
    }

    createUserListDisplay = () => {
        let promiseArray = [];
        this.state.arrayWithShowIDs.forEach((each) => {
            promiseArray.push(axios({url: `https://api.tvmaze.com/shows/${each}`}))
        })
        Promise.all(promiseArray).then((item)=> {
            let storeArray = item.map((each) => { return each.data });
            this.setState({
                displayArray: storeArray,
            })
        });
    }

    counterFunc = (event) => {
        const dbRef = firebase.database().ref(this.props.match.params.listid).child("shows")
        const showID = event.target.getAttribute("showid")
        const myNum = parseInt(event.target.value)
        const origNum = this.state.displayListInfo.shows[showID].counter
        dbRef.child(showID).update({ counter: (origNum + myNum) })
        const unsortedObj = this.state.displayListInfo.shows
        const unsortedArray = []
        for (let shows in unsortedObj) {
            unsortedArray.push({ showID: parseInt(shows), counter: unsortedObj[shows].counter })
        }
        const sortedArray = unsortedArray.sort(function (a, b) {
            return a.counter - b.counter
        })
        this.setState({
            sortedArray: sortedArray
        })
        console.log(this.state.sortedArray, "This is my sortedArr")
    }

    render() {
        return (
            <>
           <h1>{this.state.displayListInfo.listName}</h1>
                {console.log(this.state.arrayWithShowIDs)}
                <button onClick={this.counterFunc} showid={8} value={1}> UpVote </button>
                <button onClick={this.counterFunc} showid={8} value={-1}> DownVote </button>

            {
            this.state.displayArray.map((each) => {
                return(
                <>
                    <img src={each.image === null ? NoImageAvailableLarge : each.image.medium} alt={each.name} />
                    <h4 className='bodyCardRating'>{each.rating.average}</h4>
                    <h3 className='bodyCardTitle'>{each.name}</h3>
                </>
                )
            })
            }
            </>
        )
    }
}

export default UserList