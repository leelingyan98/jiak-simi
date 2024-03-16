import './App.css'
import CategoriesList from './components/CategoriesList';
import MealList from './components/MealList';
import Home from './components/Home';
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/catogories/:category">
          <MealList />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
