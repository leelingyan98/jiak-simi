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
      console.log(mealData)
    }
    fetchMeal();
  }, [mealid]);

  useEffect(() => {
    function getIngredients(obj) {
      const ingredientsList = [];
      
      // Loop through the keys of the object
      for (let i = 1; i <= 20; i++) { // Assuming there are 20 possible ingredients and measures
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        
        // Check if both ingredientKey and measureKey exist and their values are not empty
        if (Object.hasOwn(obj, ingredientKey) && Object.hasOwn(obj, measureKey) && obj[ingredientKey] && obj[measureKey]) {
          const ingredientObject = {
            strIngredient: obj[ingredientKey],
            strMeasure: obj[measureKey]
          };
          ingredientsList.push(ingredientObject);
        }
      }
      setIngredients(ingredientsList);
      console.log(ingredientsList);
    }
    getIngredients(mealData);
  }, [mealData])

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
      <button onClick={() => handleSaveMeal()}>Save meal!</button>
      <h1>{mealData.strMeal}</h1>
      <hr />
      <div className="mealDisplay">
        <div className="mealPhoto">
          <img src={mealData.strMealThumb}></img>
          <p>Category: {mealData.strCategory}</p>
          <p>Area: {mealData.strArea}</p>
        </div>
        <div className="mealInfo">
          <h2>Ingredients</h2>
          <ul className="ingredients">
          {ingredients.map(ingredient => {
            return (
              <li>{ingredient.strMeasure} {ingredient.strIngredient}</li>
            )
          })}
          </ul>
          <h2>Instructions</h2>
          <p>{mealData.strInstructions}</p>
          <p>Source: {mealData.strSource}</p>
          <p>Tags: {mealData.strTags}</p>
          <p>Youtube: {mealData.strYoutube}</p>
        </div>
      </div>
    </div>
  )
}

export default Meal;