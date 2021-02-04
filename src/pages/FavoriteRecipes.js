import React, { useState } from 'react';

import { Header, Favorite, ButtonsFavorite } from '../components';
import '../styles/favorite.css';

function FavoriteRecipes() {
  const localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [recipesStorage, setRecipesStorage] = useState(!localRecipes ? [] : localRecipes);
  return (
    <div>
      <Header title="Receitas Favoritas" isSearchable={ false } />
      <ButtonsFavorite
        setRecipesStorage={ setRecipesStorage }
        localRecipes={ localRecipes }
      />
      <Favorite
        setRecipesStorage={ setRecipesStorage }
        recipesStorage={ recipesStorage }
      />
    </div>
  );
}

export default FavoriteRecipes;
