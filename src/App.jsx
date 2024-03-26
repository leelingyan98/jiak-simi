import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import CategoriesList from './components/CategoriesList';
import CategoryList from './components/CategoryList';
import Meal from './components/Meal';
import RandomMeal from './components/RandomMeal';
import SavedMealsList from './components/SavedMealsList';
import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react'

function App() {
  const [savedMeals, setSavedMeals] = useState([]);

  const getSavedMeals = async function () {
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
    console.log(jsonData.records);
  }

  useEffect(() => {
    getSavedMeals();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path="/categories/:category/:mealid">
          <Meal
            savedMeals={savedMeals}
            getSavedMeals={getSavedMeals}
          />
        </Route>

        <Route path="/categories/:category">
          <CategoryList />
        </Route>

        <Route path="/categories">
          <CategoriesList />
        </Route>

        <Route path="/saved">
          <SavedMealsList savedMeals={savedMeals} />
        </Route>

        <Route path="/random">
          <RandomMeal
            savedMeals={savedMeals}
            getSavedMeals={getSavedMeals}
          />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
