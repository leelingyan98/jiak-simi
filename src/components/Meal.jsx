import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';

function Meal() {
  const [mealData, setMealData] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [addMeal, handleAddMeal] = useState('');
  const { category, mealid } = useParams();
  const history = useHistory();
  const airTableApiKey = import.meta.env.VITE_AIRTABLE_API;

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;

    async function fetchMeal() {
      const response = await fetch(`${mealdbURL}/lookup.php?i=${mealid}`);
      const jsonData = await response.json();
      setMealData(jsonData.meals[0])
    }
    fetchMeal();
  }, [mealid]);

  function handleSaveMeal() {
    // We make a POST call to the server with the data
    async function saveMeal() {
      try {
        const response = await fetch("https://api.airtable.com/v0/appwPOsf2rf3nLGY5/Saved", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${airTableApiKey}`
          },
          body: JSON.stringify({
            "records": [
              {
                  "fields": {
                    "Name": mealData.strMeal,
                    "idMeal": mealData.idMeal,
                  },
              }
            ]
          }),
        });
      const jsonData = await response.json();

      handleAddMeal(jsonData)
      console.log('Meal saved!')
      } catch (error) {
        console.log('Error saving meal!')   
       }
    }
    saveMeal();
  };

  return (
    <div>
      <button onClick={() => history.goBack()}>Go back</button>
      <div>
        <img src={mealData.strMealThumb}></img>
      </div>
      <div>
        <h2>{mealData.strMeal}</h2>
      </div>
      <button onClick={() => handleSaveMeal()}>Save meal!</button>
      <p>Meal ID: {mealData.idMeal}</p>
      <p>Area: {mealData.strArea}</p>
      <p>Category: {mealData.strCategory}</p>
      <p>Instructions: {mealData.strInstructions}</p>
      <p>Source: {mealData.strSource}</p>
      <p>Tags: {mealData.strTags}</p>
      <p>{mealData.strYoutube}</p>
      <p>Youtube: {mealData.strYoutube}</p>
    </div>
  )
}

export default Meal;