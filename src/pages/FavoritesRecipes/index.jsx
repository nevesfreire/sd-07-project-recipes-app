import React, { useState } from 'react';
import { Header, FavoriteCard } from '../../components';
import './FavoriteRecipes.css';

export default function FavoritesRecipes() {
  const favoriteDefault = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorites, setFavorites] = useState(favoriteDefault);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <main className="favorite-recipes-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavorites(favoriteDefault) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setFavorites(
              favoriteDefault.filter((recipe) => recipe.type === 'comida'),
            );
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFavorites(
              favoriteDefault.filter((recipe) => recipe.type === 'bebida'),
            );
          } }
        >
          Drink
        </button>
        {
          favorites ? favorites.map((recipe, index) => (
            <FavoriteCard setFavorites={ setFavorites } index={ index } key={ index } recipe={ recipe } />
          ))
            : <p>Nao há receitas favoritas</p>
        }
      </main>
    </div>
  );
}
