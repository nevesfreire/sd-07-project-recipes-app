import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

import RecipesFavoriteCard from '../components/RecipesFavoriteCard';

function RecipesFavorites() {
  const { setSelectedTypeItem } = useContext(RecipesContext);

  const setFilterRecipesDone = (data) => {
    setSelectedTypeItem(data);
  };

  return (
    <div>
      <section className="profile-buttons">
        <button
          type="button"
          className="btn btn-sm color-button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterRecipesDone('all') }
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-sm color-button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterRecipesDone('bebida') }
        >
          Foods
        </button>
        <button
          type="button"
          className="btn btn-sm color-button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterRecipesDone('comida') }
        >
          Drinks
        </button>
      </section>
      <section>
        <RecipesFavoriteCard />
      </section>
    </div>
  );
}

export default RecipesFavorites;
