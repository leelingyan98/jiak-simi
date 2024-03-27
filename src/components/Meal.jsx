import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';

function Meal(props) {
  const { savedMeals, getSavedMeals } = props;
  const [mealSaved, setMealSaved] = useState(false);
  const [mealData, setMealData] = useState('');
  const [ingredients, setIngredients] = useState([]);
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

    const mealRecord = savedMeals.find((savedMeal) => savedMeal.fields.idMeal == mealData.idMeal);

    if ((typeof mealRecord !== 'undefined') && (typeof mealRecord !== undefined)) {
      setMealSaved(true);
    }
  }, [mealData])

  function handleSaveMeal() {
    getSavedMeals();

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

        console.log('Meal saved!', jsonData)
        setMealSaved(true);
      } catch (error) {
        console.log('Error saving meal!')   
      }
    }

    // Check if meal is saved before adding to list
    if (!mealSaved) {
      console.log('Attempting to save meal..');
      saveMeal();
      getSavedMeals();
    } else {
      console.log('sorry, meal added');
    }
  };

  function handleDeleteMeal() {
    getSavedMeals();
    // Get record ID by searching for the meal ID
    const mealRecord = savedMeals.find((savedMeal) => savedMeal.fields.idMeal == mealData.idMeal);

    // API Call to delete record
    async function deleteMeal() {
      try {
        const response = await fetch(`https://api.airtable.com/v0/appwPOsf2rf3nLGY5/Saved/${mealRecord.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${airTableApiKey}`
          },
        });
        const jsonData = await response.json();

        console.log('Meal deleted!', jsonData)
        setMealSaved(false);
      } catch (error) {
        console.log('Error deleting meal!')   
      }
    }
    deleteMeal();
    setMealSaved(false);
    getSavedMeals();
  };

  return (
    <div>
      <button onClick={() => history.goBack()}>Go back</button>
      {mealSaved
        ? <button onClick={() => handleDeleteMeal()}>Remove from saved</button>
        : <button onClick={() => handleSaveMeal()}>Save meal!</button>
      }
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