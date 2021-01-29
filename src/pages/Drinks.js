import React, { useContext } from 'react';
import { Header, Footer, RandonDrinkCards, DrinkCards } from '../components';
import { CupNodesContext } from '../contexts';

export default function Drinks() {
  const { filterDates: { category } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Bebidas" />
      {
        category.length
          ? <DrinkCards number={ 5 } category={ category } />
          : <RandonDrinkCards number={ 5 } />
      }
      <Footer />
    </div>
  );
}
