import React from 'react';
import CategoriesList from './CategoriesList';

function Home() {
  return (
    <div>
        <h1>Jiak Simi?</h1>
        <h2>Dunno what to eat?</h2>
        <p>Choose a category to start!</p>
        <CategoriesList />
        <h2>Huh? So mafan</h2>
        <p>Lazy to think? Nevermind, can click below.</p>
        <button>Give me a random meal!</button>
    </div>
  )
}

export default Home;