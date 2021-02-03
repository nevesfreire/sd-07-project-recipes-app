import React, { useState, useEffect } from 'react';

function FavoriteFoodCard() {
  const [favRecipes, setfavRecipes] = useState([]);

  useEffect(() => {
    const favoritesRecipes = window.localStorage.getItem('favoriteRecipes');
    if (favoritesRecipes) {
      const favoritesRecipesParse = JSON.parse(favoritesRecipes);
      setfavRecipes(favoritesRecipesParse);
    }
  }, []);

  function filterFood() {
    const recipes = window.localStorage.getItem('favoriteRecipes');
    const recipesParsed = JSON.parse(recipes);
    const filteredFood = recipesParsed.filter((recipe) => recipe.type === 'comida');
    setfavRecipes(filteredFood);
  }

  function fiterDrink() {
    const recipes = window.localStorage.getItem('favoriteRecipes');
    const recipesParsed = JSON.parse(recipes);
    const filterDrink = recipesParsed.filter((recipe) => recipe.type !== 'comida');
    setfavRecipes(filterDrink);
  }
  function filterAll() {
    const recipes = window.localStorage.getItem('favoriteRecipes');
    return setfavRecipes(JSON.parse(recipes));
  }

  return (
    <div>
      <button
        onClick={ filterAll }
        type="button"
        data-testid="filter-by-all-btn">
        All
      </button>
      <button
        onClick={ filterFood }
        type="button"
        data-testid="filter-by-food-btn">
        Food
      </button>
      <button
        onClick={ fiterDrink }
        type="button"
        data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {favRecipes.map((favRecipe, index) => (
        <section key={ favRecipe.id }>
          <img
            alt="favorites-"
            data-testid={ `${index}-horizontal-image` }
            src={ favRecipe.image }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            { favRecipe.category }
          </span>
          <h5 data-testid={ `${index}-horizontal-name` }>
            {favRecipe.name}
          </h5>
          <span data-testid={ `${index}-horizontal-done-date` }>
            {favRecipe.doneDate}
          </span>
          <img data-testid={ `${index}-horizontal-share-btn` } alt="compartilhe" />
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="receita-favorita"
          />
        </section>
      ))}
    </div>
  );
}

export default FavoriteFoodCard;
