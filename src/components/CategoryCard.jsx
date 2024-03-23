import React from 'react';
import { Link } from "react-router-dom";

function CategoryCard(props) {
  return (
    <div className="categoryCard">
        <img src={props.image} />
        <Link to={`/categories/${props.label}`}>{props.label}</Link>
    </div>
  )
}

export default CategoryCard;