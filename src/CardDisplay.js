import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    console.log(this.props.data)
    this.setState({
      displayArray: this.props.data,
    },() => console.log(this.state.displayArray))
  }

  render() {
      return (
        <div>
          {
            this.state.displayArray.map((each) => {
              return(
              <Link to={`/show/${each.id}`}>
                <div className='cardContainer'>
                  <img src={each.image.medium} alt="add this"/>
                  <h4 className='bodyCardRating'>{each.rating.average}</h4>
                  <h3 className='bodyCardTitle'>{each.name}</h3>
                </div>
              </Link> 
              )
            })
          }
        </div>
      );
    }
}

export default CardDisplay;
