import React, { useContext } from 'react';
import { Header, Footer, RandonFoodCards, FoodCards } from '../components';
import { CupNodesContext } from '../contexts';

export default function Foods() {
  const { filterDates: { category } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Comidas" />
      {
        category.length
          ? <FoodCards number={ 5 } category={ category } />
          : <RandonFoodCards number={ 5 } food={ false } />
      }
      <Footer />
    </div>
  );
}
