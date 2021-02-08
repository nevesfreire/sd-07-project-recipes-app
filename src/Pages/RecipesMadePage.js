import React from 'react';
import Header from '../Components/Header';
import DoneFoodCard from '../Components/DoneFoodCard';

function RecipesMadePage() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <DoneFoodCard />
    </div>
  );
}

export default RecipesMadePage;
