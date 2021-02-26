import React from 'react';
import RecipeDetail from '../components/RecipeDetail';
// import { getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import '../css/card.css';

function MainRecipeDetail() {
  return (
    <div className="detalhes">
      <RecipeDetail />
    </div>
  );
}

export default MainRecipeDetail;
