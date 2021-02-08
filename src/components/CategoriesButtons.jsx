import React, { useContext } from 'react';
import MadeContext from '../context/MadeContext';

export default function CategoriesButtons() {
  const { setFilterButton } = useContext(MadeContext);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setFilterButton('all');
        } }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => {
          setFilterButton('comida');
        } }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFilterButton('bebida');
        } }
      >
        Drinks
      </button>
    </div>
  );
}
