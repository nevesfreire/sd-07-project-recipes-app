import React from 'react';
import ExploreIngredientsBtns from '../components/ExploreIngredientsBtns';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreIngredients() {
  return (
    <div className="profile-main">
      <Header />
      <ExploreIngredientsBtns />
      <Footer />
    </div>
  );
}
