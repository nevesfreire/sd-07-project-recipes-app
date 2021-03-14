import React from 'react';
import RecipeDetail from '../components/RecipeDetail';
// import { getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import '../css/card.css';

function ShowRecipeDetail() {
  return (
    <div className="detalhes">
      <RecipeDetail />
    </div>
  );
}

export default ShowRecipeDetail;
