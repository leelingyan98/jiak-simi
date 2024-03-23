import React from 'react';
import { Link } from "react-router-dom";

function MealCard(props) {
  return (
    <div>
        <Link to={`/categories/${props.category}/${props.id}`}>
          <div className="categoryCard">
            <img src={props.image} />
            {props.label}
          </div>
        </Link>
    </div>
  )
}

export default MealCard;