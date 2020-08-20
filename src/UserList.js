import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "./firebase";
// import Counter from "./Counter"

class UserList extends Component {
    constructor() {
        super();
        this.state = {
            displayListInfo: {}

        }
    }


//Okay, just a tip, once you get your array of tv id's, use a foreach to loop over the array and replace 599 in this endpoint with each show id and push to a temp array:


    componentDidMount = () => {
        const dbRef = firebase.database().ref(this.props.match.params.listid)
        console.log(this.props.match.params.listid)
        dbRef.on('value', (snapshot) => {
            const dbReturn = snapshot.val()
            console.log(dbReturn, "dbReturn")
            const idArray = []
            for (let objEntry in dbReturn.shows) {
                idArray.push(parseInt(objEntry))
            }
           
// start of what I copied over from the previous axios call
        // axios({
        //     url: "https://api.tvmaze.com/shows/" + this.props.match.params.id,
        //     }).then((response) => {
        //         this.setState({
        //             apiData: response.data
        //         });
        //     });
// end of what I copied over from the previous axios call. 
            
            console.log(idArray, "idArray")
            this.setState({
                displayListInfo: dbReturn,
                arrayWithShowIDs: idArray
            })
        })

    }

    render() {
        return (
            <div>
                <h1>{this.state.displayListInfo.listName}</h1>
                {console.log(this.state.arrayWithShowIDs)}
                {/* <Counter props={this.props.match.params.listid} /> */}
                {/* the above line could be taken out at the end. I've left it in for now */}

            </div>

        )
    }
}

export default UserList