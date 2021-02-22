import React from 'react';
import { Header, Footer, IngredientsCardsFactory } from '../components';

export default function IngredientsExploreFood() {
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      <IngredientsCardsFactory number={ 12 } />
      <Footer />
    </div>
  );
}
