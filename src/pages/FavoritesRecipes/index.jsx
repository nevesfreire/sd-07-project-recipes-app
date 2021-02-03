import React, { useContext } from 'react';
import { Header, FavoriteCard } from '../../components';
import { RecipesContext } from '../../context';

export default function FavoritesRecipes() {
  const { favorites } = useContext(RecipesContext);

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
        {
          favorites ? favorites.map((recipe, index) => (
            <FavoriteCard index={ index } key={ index } recipe={ recipe } />
          ))
            : <p>Nao há receitas favoritas</p>
        }
      </main>
    </div>
  );
}
