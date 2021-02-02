import React from 'react';
import Header from '../../Components/Header';
import '../../App.css';
import RecipeDetail from '../../Components/RecipeDetail';

const FoodDetailPage = () => (
  <div className="container-over">
    <div className="container-int">
      <Header title="Detalhe da Comida" />
      <RecipeDetail />
    </div>
  </div>
);

export default FoodDetailPage;
