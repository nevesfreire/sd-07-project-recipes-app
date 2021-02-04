import React from 'react';
import { CardAll, Header } from '../../Components';

function DoneRecipes() {
  const handleDrink = () => <CardAll />;

  const handleFood = () => <CardAll />;

  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" onClick={ handleFood } data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" onClick={ handleDrink } data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </div>
  );
}

export default DoneRecipes;
