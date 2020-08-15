import React from "react";

const TvShowCard = (props) => {
  return (
    <div className="tvShowCard">
      <h1 className="showTitle">{props.title}</h1>
      <img src={props.img} alt={props.alt} />
      <ul>
        <li>{props.network}</li>
        <li>{props.country}</li>
        <li>{props.genre}</li>
        <li>{props.description}</li>
      </ul>
    </div>
  );
};

export default TvShowCard;
