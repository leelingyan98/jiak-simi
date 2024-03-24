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

  useEffect(() => {
    const airTableApiKey = import.meta.env.VITE_AIRTABLE_API;

    async function getSavedMeals() {
      const response = await fetch(
        "https://api.airtable.com/v0/appwPOsf2rf3nLGY5/Saved?maxRecords=3&view=Grid%20view",
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
    getSavedMeals();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path="/categories/:category/:mealid">
          <Meal savedMeals={savedMeals} />
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
          <RandomMeal savedMeals={savedMeals} />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
