import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddToList from "./AddToList"
import axios from "axios";


class TvShowCard extends Component {
	constructor() {
		super();
		this.state = {
			apiData: [],
		};
	}
	componentDidMount() {
		axios({
			url: "https://api.tvmaze.com/shows/" + this.props.match.params.id,
		}).then((response) => {
			this.setState({
				apiData: response.data
			});
		});
	}
	render() {
		const data = this.state.apiData;
		return (
			<div className="tvShowCard">
				<h1 className="showTitle">{data.name}</h1>
				<img src={data.image && data.image.medium} alt={data.name} />
				<ul>
					<li>{data.network && data.network.name}</li>
					<li>{data.country}</li>
					<li>{data.genres}</li>
					<li>{data.summary && data.summary.replace(/(<([^>]+)>)/gi, "")}</li>
					<AddToList id={this.props.match.params.id} />
				</ul>
				<div>
					<Link to={`/`}>
						<button>this is a button to go back</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default TvShowCard;
