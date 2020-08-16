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
      console.log(displayData.show.image);
      return (
        <div>
          <div className="cardContainer">
            <span>
              <img
                src={displayData.show.image && displayData.show.image.medium}
              />
            </span>
            <span className="bodyCardRating">
              {displayData.show.rating.average}
            </span>
          </div>
          <div className="bodyCardtitle">{displayData.show.name}</div>
        </div>
      );
    }
  }
}

export default CardDisplay;
