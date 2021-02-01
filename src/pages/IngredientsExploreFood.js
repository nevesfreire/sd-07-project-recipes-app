import React from 'react';
import { Header, Footer, IngredientsCardsFactory } from '../components';

const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export default function IngredientsExploreFood() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <IngredientsCardsFactory number={ 12 } URL={ URL } drink={ false } />
      <Footer />
    </div>
  );
}
