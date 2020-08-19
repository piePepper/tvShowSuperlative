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
        apiData: response.data 
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
        <h1 className="showTitle">{data.name}</h1>
        <img src={data.image && data.image.medium} alt={data.name} />
        <ul>
          <li>{data.network && data.network.name}</li>
          <li>{data.country}</li>
          <li>{data.genres}</li>
          <li>{data.summary && data.summary.replace(/(<([^>]+)>)/gi, "")}</li>
        </ul>
      </div>
    );
  }
}

export default TvShowCard;
