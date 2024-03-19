import './App.css';
import Home from './components/Home';
import CategoryList from './components/CategoryList';
import Meal from './components/Meal';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Switch>
      <Route path="/:category/:mealid">
          <Meal />
        </Route>

        <Route path="/:category">
          <CategoryList />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
