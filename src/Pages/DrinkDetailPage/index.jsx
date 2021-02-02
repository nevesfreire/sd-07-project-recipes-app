import React from 'react';
import Header from '../../Components/Header';
import '../../App.css';
import RecipeDetailDrink from '../../Components/RecipeDetailDrink';

const DrinkDetailPage = () => (
  <div className="container-over">
    <div className="container-int">
      <Header title="Detalhe da bebida" />
      <RecipeDetailDrink />
    </div>
  </div>
);

export default DrinkDetailPage;
