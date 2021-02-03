import React from 'react';
import { Header, FavoriteCard } from '../../components';

export default function FavoritesRecipes() {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <main>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
        { favoriteList && favoriteList.map((recipe, index) => (
          <FavoriteCard index={ index } key={ index } recipe={ recipe } />
        ))}
      </main>
    </div>
  );
}
