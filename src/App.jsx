import { useState } from 'react'
import './App.css'
import Categories from './components/Categories';

function App() {
  return (
    <div className="container">
      <h1>Jiak Simi?</h1>
      <h2>Dunno what to eat?</h2>
      <p>Choose a category to start!</p>
      <div className="categories">
        <Categories />
      </div>
      <h2>Huh? So mafan to think</h2>
      <p>Lazy to think? Nevermind, can click below.</p>
      <button>Give me a random meal!</button>
    </div>
  )
}

export default App
