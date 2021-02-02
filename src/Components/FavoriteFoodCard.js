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
  return (
    <div>
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
