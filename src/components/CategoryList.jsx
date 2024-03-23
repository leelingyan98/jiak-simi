import React, { useState, useEffect } from 'react'
import MealCard from './MealCard'
import { Link, useParams, useHistory } from 'react-router-dom';

function CategoryList() {
  const [categoryMeals, setCategoryMeals] = useState('');
  const { category } = useParams();
  const history = useHistory();

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;

    async function fetchCategoryMeals() {
      const response = await fetch(`${mealdbURL}/filter.php?c=${category}`);
      const jsonData = await response.json();
      setCategoryMeals(jsonData.meals);
    }
    fetchCategoryMeals();
  }, [category]);
  
  if (categoryMeals.length > 0) {
    return (
      <div>
        <button onClick={() => history.goBack()}>Go back</button>
        <h1>{category}</h1>
        <ul className="categoriesList">
          {categoryMeals.map(meal => {
            return (
              <li>
                <MealCard
                  key={meal.idMeal}
                  label={meal.strMeal}
                  image={meal.strMealThumb}
                  id={meal.idMeal}
                  category={category}
                />
              </li>
            )
          })}
        </ul>
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