import React from 'react';
import Header from '../Components/Header';
import DoneFoodCard from '../Components/DoneFoodCard';

function RecipesMadePage() {
  return (
    <div>
      <Header title="Receitas Feitas" />

      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      <DoneFoodCard />
    </div>
  );
}

export default RecipesMadePage;
