import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

function RecipesMadePage() {
  const zero = 0;
  const [index, setIndex] = useState(zero);
  const [madeRecipes, setmadeRecipes] = useState([]);

  useEffect(() => {
    const madenRecipes = window.localStorage.getItem('favoriteRecipes');
    if (madenRecipes) {
      const madeRecipesParse = JSON.parse(madenRecipes);
      setmadeRecipes(madeRecipesParse);
    }
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </div>
  );
}

export default RecipesMadePage;
