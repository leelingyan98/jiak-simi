import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import MealCard from './MealCard'

function SavedMealsList(props) {
  const { savedMeals } = props;
  const [savedMealsData, setSavedMealsData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;
    
    async function fetchSavedMealsData(id) {
      const response = await fetch(`${mealdbURL}/lookup.php?i=${id}`);
      const jsonData = await response.json();
      return jsonData.meals[0];
    }

    async function fetchSavedMeals() {
      if (savedMeals.length > 0 ) {
        const mealDataPromises = savedMeals.map(async (savedMeal) => {
          const mealId = savedMeal.fields.idMeal;
          return fetchSavedMealsData(mealId);
        });

        const mealDataArray = await Promise.all(mealDataPromises);
        setSavedMealsData(mealDataArray);
      } 
    }
    fetchSavedMeals();
  }, []);

  if (savedMealsData.length > 0) {
    return (
      <div>
        <button onClick={() => history.goBack()}>Go back</button>
        <ul className="categoriesList">
          {savedMealsData.map(meal => {
            return(
              <li key={meal.idMeal}>
                <MealCard
                  label={meal.strMeal}
                  image={meal.strMealThumb}
                  id={meal.idMeal}
                  category={meal.strCategory}
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

export default SavedMealsList;