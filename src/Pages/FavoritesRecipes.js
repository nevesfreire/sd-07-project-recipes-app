import React, { useState, useFetch } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
// import useFetch from '../hooks/useFetch';

function FavoritesRecipes() {
//   const { randomDrinkFetch, randomFoodFetch } = useFetch();

  return (
    <div>
      <Header title="Receitas Favoritas" explore />
      <button type="button" onClick={ () => {} } data-testid="filter-by-all-btn">All</button>
      <button type="button" onClick={ () => {} } data-testid="filter-by-food-btn">Food</button>
      <button type="button" onClick={ () => {} } data-testid="filter-by-drink-btn">Drinks</button>
      <Card />
    </div>

  );
}

export default FavoritesRecipes;
