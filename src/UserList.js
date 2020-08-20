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
                arrayWithShowIDs: idArray
            }, () => this.createUserListDisplay())
        })
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