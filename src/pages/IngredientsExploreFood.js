import React from 'react';
import { Header, Footer, IngredientsCardsFactory } from '../components';

export default function IngredientsExploreFood() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <IngredientsCardsFactory number={ 12 } drink={ false } />
      <Footer />
    </div>
  );
}
