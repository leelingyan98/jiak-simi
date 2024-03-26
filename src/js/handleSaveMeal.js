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
    } catch (error) {
      console.log('Error saving meal!')   
    }
  }

  // Check if meal is saved before adding to list
  if (!mealSaved) {
    console.log('Attempting to save meal..');
    saveMeal();
    getSavedMeals();
    setMealSaved(true);
  } else {
    setMealSaved(false);
    console.log('sorry, meal added');
  }
};