import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

function SavedMealsList() {
  const [savedMeals, setSavedMeals] = useState('');
  const [savedMealsData, setSavedMealsData] = useState('');
  const history = useHistory();

  useEffect(() => {
    const airTableApiKey = import.meta.env.VITE_AIRTABLE_API;
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;

    async function fetchSavedMealsData(id) {
      const response = await fetch(`${mealdbURL}/lookup.php?i=${id}`);
      const jsonData = await response.json();
      setSavedMealsData(...savedMealsData, jsonData.meals[0]);
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
      console.log(savedMeals)

      // if (savedMeals.length > 0 ) {
      //   savedMeals.forEach(savedMeal => {
      //     console.log(savedMeal);
      //   });
      // } 
    }
    getSavedMeals();
  }, []);

  // return (
  //   <div>test</div>
  // )
  if (savedMeals.length > 0) {
    return (
      <div className="categoriesList">
        <button onClick={() => history.goBack()}>Go back</button>
        A test for saved meals
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