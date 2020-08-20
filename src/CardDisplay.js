import React, { Component } from "react";
import { Link } from "react-router-dom";
import NoImageAvailableLarge from './images/NoImageAvailableLarge.jpg'

// Display for each individual card

class CardDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayArray: []
		}
	}

	componentDidUpdate(previousProps, previousState) {
		if (previousProps.data !== this.props.data) {
			this.setDisplayArray();
		}
	}

	setDisplayArray = () => {
		this.setState({
			displayArray: this.props.data,
		})
	}

  render() {
      return (
        <div className="cardContainer">
          {
            this.state.displayArray.map((each) => {
              return(
                <div className="movieContainer">
                      <Link to={`/show/${each.id}`}>
                          <img src={each.image === null ? NoImageAvailableLarge : each.image.medium} alt={each.name} />
                          <h4 className='bodyCardRating'>{each.rating.average}</h4>
                          <h3 className='bodyCardTitle'>{each.name}</h3>
                      </Link> 
                </div>
              )
            })
          }
        </div>
      );
    }
}

export default CardDisplay;
