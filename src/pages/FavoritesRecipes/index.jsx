import React, { useContext } from 'react';
import { Header, FavoriteCard } from '../../components';
import { RecipesContext } from '../../context';

export default function FavoritesRecipes() {
  const { favorites, setFavorites } = useContext(RecipesContext);
  const favoriteDefault = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <main>
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
            <FavoriteCard index={ index } key={ index } recipe={ recipe } />
          ))
            : <p>Nao há receitas favoritas</p>
        }
      </main>
    </div>
  );
}
