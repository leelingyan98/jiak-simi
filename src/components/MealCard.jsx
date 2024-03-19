import React from 'react';
import { Link } from "react-router-dom";

function MealCard(props) {
  return (
    <div className="categoryCard">
        <img src={props.image} />
        <Link to={`${props.category}/${props.id}`}>{props.label}</Link>
    </div>
  )
}

export default MealCard;