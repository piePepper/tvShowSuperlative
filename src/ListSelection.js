import React, { Component } from 'react';
import firebase from './firebase'

class ListSelection extends Component {
    constructor() {
        super();
    }



    componentDidMount = () => {
        const dbRef = firebase.database().ref()
        dbRef.on('value', (snapshot) => {
            console.log(this.props.listName)
            // Need to use this to display code to the screen on the side 
        })
    }


    render() {
        return (
            <div className="firebase-data">
                {console.log(this.props)}
                <h1>User Lists</h1>
                <ul>

                </ul>
            </div>
        )
    }
}

export default ListSelection;

