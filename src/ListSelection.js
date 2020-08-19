import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from "react-router-dom";

class ListSelection extends Component {
    constructor() {
        super();
        this.state = {
            dbReturn: []
        }
    }

    componentDidMount = () => {
        const dbRef = firebase.database().ref()
        dbRef.on('value', (snapshot) => {
            const dbArray = []
            const dbReturn = snapshot.val()
            for (let objEntry in dbReturn) {

                if (objEntry.length > 14) {
                    dbArray.push({ key: objEntry, name: dbReturn[objEntry] })
                }
            }
            console.log(dbArray, "this is my database array")
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
                    {this.state.dbReturn.map((entry) => {
                        return (
                            <li key={entry.key}>
                                <Link to={`/list/${entry.key}`}>
                                    <p>{entry.name.listName}</p>
                                    <button onClick={() => { this.removeList(entry.key) }}>X</button>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ListSelection;

