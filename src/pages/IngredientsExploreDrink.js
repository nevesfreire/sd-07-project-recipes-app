import React from 'react';
import { Header, Footer, IngredientsDrinkCards } from '../components';

export default function IngredientsExploreFood() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <IngredientsDrinkCards number={ 12 } />
      <Footer />
    </div>
  );
}
