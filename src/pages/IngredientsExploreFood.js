import React from 'react';
import { Header, Footer, IngredientsFoodCards } from '../components';

export default function IngredientsExploreFood() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <IngredientsFoodCards number={ 12 } />
      <Footer />
    </div>
  );
}
