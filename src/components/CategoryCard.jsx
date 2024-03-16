import React from 'react'
import Category from './Category'

function CategoryCard(props) {
  return (
    <div className="categoryCard">
        <img src={props.image} />{props.label}
    </div>
  )
}

export default CategoryCard;