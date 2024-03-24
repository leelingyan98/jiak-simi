import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import CategoriesList from './components/CategoriesList';
import CategoryList from './components/CategoryList';
import Meal from './components/Meal';
import RandomMeal from './components/RandomMeal';
import SavedMealsList from './components/SavedMealsList';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path="/categories/:category/:mealid">
          <Meal />
        </Route>

        <Route path="/categories/:category">
          <CategoryList />
        </Route>

        <Route path="/categories">
          <CategoriesList />
        </Route>

        <Route path="/saved">
          <SavedMealsList />
        </Route>

        <Route path="/random">
          <RandomMeal />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
