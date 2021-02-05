import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const recipesFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipesFromStorage);
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoriteRecipes(recipesFromStorage) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFavoriteRecipes(recipesFromStorage
            .filter((recipe) => recipe.type === 'comida')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavoriteRecipes(recipesFromStorage
            .filter((recipe) => recipe.type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      <div>
        { favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.id }
            favoriteRecipes={ recipe }
            index={ index }
          />
        )) }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
