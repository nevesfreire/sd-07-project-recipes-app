import React from 'react';
import PropTypes from 'prop-types';

function ButtonsFavorite({ setRecipesStorage, localRecipes }) {
  const handlerFilterFavorite = (({ target }) => {
    const { value } = target;
    if (value === 'all') {
      setRecipesStorage(!localRecipes ? [] : localRecipes);
    } else {
      setRecipesStorage(localRecipes && localRecipes.filter(
        ({ type }) => type === value,
      ));
    }
  });

  return (
    <div className="div-buttons">
      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        onClick={ handlerFilterFavorite }
      >
        All
      </button>
      <button
        type="button"
        value="comida"
        data-testid="filter-by-food-btn"
        onClick={ handlerFilterFavorite }
      >
        Food
      </button>
      <button
        type="button"
        value="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ handlerFilterFavorite }
      >
        Drinks
      </button>
    </div>
  );
}

ButtonsFavorite.propTypes = {
  setRecipesStorage: PropTypes.func.isRequired,
  localRecipes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ButtonsFavorite;
