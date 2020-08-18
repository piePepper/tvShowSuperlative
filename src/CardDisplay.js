// Display for each individual card

import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const displayData = this.props.data;

    if (!displayData) {
      return <div>Loading</div>;
    } else {
      console.log(displayData.image);
      return (
        <div>
          <Link to={`/show/${displayData.id}`}>
            <div className="cardContainer">
              <img src={displayData.image} />
              <h4 className="bodyCardRating">{displayData.average}</h4>
              <h3 className="bodyCardtitle">{displayData.name}</h3>
            </div>
          </Link>
        </div>
      );
    }
  }
}

export default CardDisplay;
