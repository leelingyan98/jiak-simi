import { getSavedMeals } from "./getSavedMeals";

export function handleSaveMeal(mealName, mealId) {
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
                  "Name": mealName,
                  "idMeal": mealId,
                },
            }
          ]
        }),
      });
      const jsonData = await response.json();

      console.log('Meal saved!', jsonData)
    } catch (error) {
      console.log('Error saving meal!')   
    }
  }

  // Check if meal is saved before adding to list
  function checkSavedMeals() {
    getSavedMealsIds();
    const mealExists = savedMealsIds.includes(mealid);

    if (!mealExists) {
      saveMeal();
      getSavedMeals();
      console.log('saved!')
    } else {
      console.log('sorry, meal added')
    }
  }
  checkSavedMeals();
};