import { useState, useEffect } from 'react';
import React from 'react';
import CategoryCard from './CategoryCard';

function CategoriesList() {
  const [categories, setCategories] = useState('');

  useEffect(() => {
    const mealdbURL = import.meta.env.VITE_MEALDB_URL;

    async function fetchCategories() {
      const response = await fetch(`${mealdbURL}/categories.php`);
      const jsonData = await response.json();
      setCategories(jsonData.categories);
    }
    fetchCategories();
  }, []);

  if (categories.length > 0) {
    return (
      <div>
        <h1>Categories</h1>
        <ul className="categoriesList">
          {categories.map(category => {
            return(
              <li key={category.idCategory}>
                <CategoryCard
                  label={category.strCategory}
                  image={category.strCategoryThumb}
                  desc={category.strCategoryDescription}
                />
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => history.goBack()}>Go back</button>
        <h1>Categories</h1>
        <p>Loading...</p>
      </div>
    )
  }
}

export default CategoriesList;