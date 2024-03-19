import { useState, useEffect } from 'react'
import React from 'react'
import CategoryCard from './CategoryCard'

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
      <div className="categoriesList">
        {categories.map(category => {
          return(
            <CategoryCard
              key={category.idCategory}
              label={category.strCategory}
              image={category.strCategoryThumb}
              desc={category.strCategoryDescription}
            />
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => history.goBack()}>Go back</button>
        <p>Loading...</p>
      </div>
    )
  }
}

export default CategoriesList;