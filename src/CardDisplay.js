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
          {/* create onClick to display - refer to  */}
          <div className="cardContainer">
            <img
              src={displayData.show.image && displayData.show.image.medium}
            />

            <h4 className="bodyCardRating">
              {displayData.show.rating.average}
            </h4>
            <h3 className="bodyCardtitle">{displayData.show.name}</h3>
          </div>
        </div>
      );
    }
  }
}

export default CardDisplay;
