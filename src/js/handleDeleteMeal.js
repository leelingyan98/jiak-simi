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
      } catch (error) {
        console.log('Error deleting meal!')   
      }
    }
    deleteMeal();
    setMealSaved(false);
    getSavedMeals();
};