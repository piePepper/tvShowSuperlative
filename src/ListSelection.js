import React, { Component } from 'react';
import firebase from './Firebase'

class ListSelection extends Component {
    constructor() {
        super();
        this.state = {
            userSelection: []
        }
    }

    componentDidMount() {
        //Variable refers to the firebase database
        const dbRef = firebase.database().ref()

        //Event listener when changes are made to database
        dbRef.on('value', (snapshot) => {

            //Where our data from firebase will be stored 
            const data = snapshot.val()
            //new array to hold the firebase data
            const newSelection = []
            //for in loop to, loop through the firebase object push the information stored in the newSelection to the page.
            for (let key in data) {
                newSelection.push({key: key, name: data[key]})
            }

            this.setState({
                userSelection: newSelection
            })        

        })
    }

    render() {
        return (
            <div className="firebase-data">
                <ul>
                    {
                    this.state.userSelection.map( (selection) => {
                        return (
                        <li key={selection.key}>
                                <p>{selection.name}</p>
                        </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default ListSelection;

