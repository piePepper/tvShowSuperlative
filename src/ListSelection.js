import React, { Component } from 'react';
import firebase from './firebase';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import UserList from "./UserList";
class ListSelection extends Component {
    constructor() {
        super();
        this.state = {
            dbReturn: []
        }
    }

// this gets the fire base information and stores it in the state
    componentDidMount = () => {
        const dbRef = firebase.database().ref()
        dbRef.on('value', (snapshot) => {
            const dbArray = []
            const dbReturn = snapshot.val()
            for (let objEntry in dbReturn) {
                // this line essentially says ONLY display keys that are 14 letters long. since our "global counter list has less than 14 letters it will ignore that."
                if (objEntry.length > 14) {
                    dbArray.push({ key: objEntry, name: dbReturn[objEntry] })
                    console.log(dbArray)
                }
            }

            this.setState({
                dbReturn: dbArray
            })
        })
    }

    removeList(listID) {
        const dbRef = firebase.database().ref()
        dbRef.child(listID).remove()
    }




    render() {
        return (
            <div className="firebase-data">
                <h1>User Lists</h1>
                <ul>
                    {this.state.dbReturn.map((listName) => {
                        return (
                            <li key={listName.key}>
                                <Link to={`/list/${listName.key}`}>
                                <p>{listName.name}</p>
                                <button onClick={() => { this.removeList(listName.key) }}>X</button>
                                </Link>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

// <Link to={`/movie/${movieObject.id}`}>
//     <img src={`http://image.tmdb.org/t/p/w500/${movieObject.poster_path}`} alt={`Official Poster for ${movieObject.original_Title}`} />
// </Link>
export default ListSelection;

