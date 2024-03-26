// Compile meal IDs into a single array, so that we can use .includes() method
export function getSavedMealsIds(savedMealsArr) {
  const savedMealsIds = [];

  savedMealsArr.forEach(savedMeal => {
    const savedMealId = savedMeal.fields.idMeal;
    savedMealsIds.push(savedMealId);
  });

  setSavedMealsIds(savedMealsIds);
  console.log('saved meal ids', savedMealsIds)
}

// Get saved meals from Airtable
export async function getSavedMeals() {
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
  console.log(jsonData.records);
}

// Fetch saved meals data from mealDB
export async function fetchSavedMealsData(id) {
    const response = await fetch(`${mealdbURL}/lookup.php?i=${id}`);
    const jsonData = await response.json();
    setSavedMeals(...savedMeals, jsonData.meals);
}