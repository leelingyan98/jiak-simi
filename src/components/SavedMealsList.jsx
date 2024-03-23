import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import MealCard from './MealCard'

function SavedMealsList() {
  const [savedMeals, setSavedMeals] = useState([]);
  const [savedMealsData, setSavedMealsData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;
    const airTableApiKey = import.meta.env.VITE_AIRTABLE_API;
    
    async function fetchSavedMealsData(id) {
      const response = await fetch(`${mealdbURL}/lookup.php?i=${id}`);
      const jsonData = await response.json();
      return jsonData.meals[0];
    }

    async function getSavedMeals() {
      const response = await fetch(
        "https://api.airtable.com/v0/appwPOsf2rf3nLGY5/Saved?maxRecords=3&view=Grid%20view",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${airTableApiKey}`,
          },
        }
      );
      const jsonData = await response.json();
      setSavedMeals(jsonData.records);

      // if (savedMeals.length > 0 ) {
      //   const mealDataPromises = savedMeals.map(async (savedMeal) => {
      //     const mealId = savedMeal.fields.idMeal;
      //     return fetchSavedMealsData(mealId);
      //   });

      //   const mealDataArray = await Promise.all(mealDataPromises);
      //   setSavedMealsData(mealDataArray);
      // } 
    }
    getSavedMeals();
  }, []);

  if (savedMeals.length > 0) {
    return (
      <div className="categoriesList">
        <button onClick={() => history.goBack()}>Go back</button>
        A test for saved meals
        {savedMealsData.map(meal => {
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

export default SavedMealsList;