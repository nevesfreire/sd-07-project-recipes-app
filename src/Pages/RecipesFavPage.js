import React from 'react';
import Header from '../Components/Header';
import FavoriteFoodCard from '../Components/FavoriteFoodCard';

function RecipesFavPage() {
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <FavoriteFoodCard />
    </div>
  );
}

export default RecipesFavPage;
