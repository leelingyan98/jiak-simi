import React from 'react';
import { Link } from "react-router-dom";

function CategoryCard(props) {
  return (
    <div>
      <Link to={`categories/${props.label}`}>
        <div className="categoryCard">
          <img src={props.image} />
          {props.label}
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard;