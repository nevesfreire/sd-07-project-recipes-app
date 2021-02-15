import React from 'react';
import RecipeDetail from '../components/RecipeDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';

function ShowRecipeDetail() {
  return (
    <div>
      <Header />
      <RecipeDetail />
      <Footer />
    </div>
  );
}

export default ShowRecipeDetail;
