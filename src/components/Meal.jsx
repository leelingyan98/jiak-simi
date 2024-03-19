import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';

function Meal() {
  const [mealData, setMealData] = useState('');
  const { category, mealid } = useParams();
  const history = useHistory();

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;

    async function fetchMeal() {
      const response = await fetch(`${mealdbURL}/lookup.php?i=${mealid}`);
      const jsonData = await response.json();
      setMealData(jsonData.meals[0])
    }
    fetchMeal();
  }, [mealid]);

  return (
    <div>
      <button onClick={() => history.goBack()}>Go back</button>
      <p>Meal ID: {mealData.idMeal}</p>
      <p>Name: {mealData.strMeal}</p>
      <p>Area: {mealData.strArea}</p>
      <p>Category: {mealData.strCategory}</p>
      <p>Thumbnail: {mealData.strMealThumb}</p>
      <p>Instructions: {mealData.strInstructions}</p>
      <p>Source: {mealData.strSource}</p>
      <p>Tags: {mealData.strTags}</p>
      <p>Youtube: {mealData.strYoutube}</p>
    </div>
  )
}

export default Meal;