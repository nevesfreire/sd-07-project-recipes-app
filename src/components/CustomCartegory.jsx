import React from 'react';

export default function CustomCartegory(category) {
  console.log(category);

  // const filterByCategory = async () => {
  //   const urlForFilterFoodByCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.category.strCategory}`;
  // const urlForFIlterDrinksByCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.category.strCategory}`;

  //   const resquestFilteredByCategory = await fetch(urlForFilterByCategory);
  //   const JSONResquestFilteredByCategory = await resquestFilteredByCategory.json();
  //   console.log(JSONResquestFilteredByCategory)
  // };

  return (
    <button
      type="button"
      data-testid={ `${category.category.strCategory}-category-filter` }
      // onClick={}
    >
      {category.category.strCategory}
    </button>
  );
}
