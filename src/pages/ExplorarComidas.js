import React from 'react';
import MealIngredientsButton from
  '../components/ExplorarComponents/MealIngredientsButton';
import MealOrigemButton from '../components/ExplorarComponents/MealOrigemButton';
import MealSurpriseButton from '../components/ExplorarComponents/MealSurpriseButton';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas() {
  return (
    <div>
      <Header />
      <MealIngredientsButton />
      <MealOrigemButton />
      <MealSurpriseButton />
      <Footer />
    </div>
  );
}
