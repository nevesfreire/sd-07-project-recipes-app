import React, { useContext } from 'react';
import FavContext from '../context/FavContext';

export default function CategoriesButtons() {
  const { setFilterFavButton } = useContext(FavContext);
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setFilterFavButton('all');
        } }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => {
          setFilterFavButton('comidas');
        } }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFilterFavButton('bebidas');
        } }
      >
        Drinks
      </button>
    </div>
  );
}
