import React, { useState, useEffect } from 'react'
import MealCard from './MealCard'
import { Link, useParams } from 'react-router-dom';

function CategoryList() {
  const [categoryMeals, setCategoryMeals] = useState('');
  const { category } = useParams();

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;

    async function fetchCategoryMeals() {
      const response = await fetch(`${mealdbURL}/filter.php?c=${category}`);
      const jsonData = await response.json();
      setCategoryMeals(jsonData.meals);
    }
    fetchCategoryMeals();
  }, []);
  
  if (categoryMeals.length > 0) {
    return (
      <div className="categoriesList">
        <Link to={"/"}>Go home</Link>
        <h1>{category}</h1>
        {categoryMeals.map(meal => {
          return(
            <MealCard
              key={meal.idMeal}
              label={meal.strMeal}
              image={meal.strMealThumb}
              id={meal.idMeal}
              category={category}
            />
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
        <Link to={"/"}>Go home</Link>
        <p>Loading...</p>
      </div>
    )
  }
}

export default CategoryList;