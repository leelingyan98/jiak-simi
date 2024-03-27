// Get saved meals from Airtable
async function getSavedMeals() {
  const airTableApiKey = import.meta.env.VITE_AIRTABLE_API;
  const response = await fetch(
    "https://api.airtable.com/v0/appwPOsf2rf3nLGY5/Saved?view=Grid%20view",
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
}

// Fetch saved meals data from mealDB
async function fetchSavedMealsData(id) {
    const response = await fetch(`${mealdbURL}/lookup.php?i=${id}`);
    const jsonData = await response.json();
    setSavedMeals(...savedMeals, jsonData.meals);
}

// Check if current meal is saved
function checkIfSavedMeal() {
  const mealRecord = savedMeals.find((savedMeal) => savedMeal.fields.idMeal == mealData.idMeal);

  if ((typeof mealRecord !== 'undefined') && (typeof mealRecord !== undefined)) {
      setMealSaved(true);
  } else {
      setMealSaved(false);
  }
}