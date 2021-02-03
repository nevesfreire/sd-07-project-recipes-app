import React from 'react';
import Header from '../Components/Header';
import FavoriteFoodCard from '../Components/FavoriteFoodCard';

function RecipesFavPage() {
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <FavoriteFoodCard />
    </div>
  );
}

export default RecipesFavPage;
