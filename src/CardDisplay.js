// Display for each individual card

import React, { Component } from "react";

class CardDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const displayData = this.props.data;

    if (!displayData) {
      return <div>Loading</div>;
    } else {


    }
  }
}

export default CardDisplay;
