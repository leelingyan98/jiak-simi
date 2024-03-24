import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';

function Meal(props) {
  const { savedMeals } = props;
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
      const instructionsArr = await jsonData.meals[0].strInstructions.split("\r\n");
      setMealData({...jsonData.meals[0], instructions: instructionsArr})
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

    // Check if meal is saved before adding to list
    function checkSavedMeals() {
      const savedMealsIds = [];

      savedMeals.forEach(savedMeal => {
        const savedMealId = savedMeal.fields.idMeal;
        savedMealsIds.push(savedMealId);
      });

      const mealExists = savedMealsIds.includes(mealid);

      if (!mealExists) {
        saveMeal();
        console.log('saved!')
      } else {
        console.log('sorry, meal added')
      }
    }
    checkSavedMeals();
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
          {mealData.strYoutube
            ? <a href={mealData.strYoutube} target="_blank"><button>Watch video</button></a>
            : null
          }
        </div>
        <div className="mealInfo">
          <h2>Ingredients</h2>
          <ul className="ingredients">
          {ingredients.length > 0
            ? ingredients.map((ingredient, i) => {
              return (
                <li key={i}>{ingredient.strMeasure} {ingredient.strIngredient}</li>
              )
            })
            : null
          }
          </ul>
          <h2>Instructions</h2>
          {mealData.instructions
            ? mealData.instructions.map((instruction, i) => {
              return (
                <p key={i}>{instruction}</p>
              )
            })
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Meal;