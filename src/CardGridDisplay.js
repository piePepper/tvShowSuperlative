// Parent Component for all the Cards

import React, { Component } from "react";
import CardDisplay from "./CardDisplay";

class CardGridDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;
    // Map returns each card component via CardDisplay
    return data.map((card) => <CardDisplay data={card} />);
  }
}

export default CardGridDisplay;
