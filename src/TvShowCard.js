import React, { Component } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

class TvShowCard extends Component {
  constructor() {
    super();
    this.state = { apiData: [] };
  }
  componentDidMount() {
    axios({
      url: "https://api.tvmaze.com/shows/" + this.props.match.params.id,
    }).then((response) => {
      console.log(response.data);
      this.setState({
        apiData: response.data,
      });
    });
  }
  render() {
    const data = this.state.apiData;
    if (!data) {
      return <div>loading</div>;
    }
    return (
      <div className="tvShowCard">
        <div className="showCardContent">
          <h1 className="showTitle">{data.name}</h1>
          <ul>
            <li>{data.network && data.network.name}</li>
            <li>{data.country}</li>
            <li>{data.genres}</li>
            <li>{data.summary && data.summary.replace(/(<([^>]+)>)/gi, "")}</li>
          </ul>
        </div>
        <img src={data.image && data.image.medium} alt={data.name} />
      </div>
    );
  }
}

export default TvShowCard;
