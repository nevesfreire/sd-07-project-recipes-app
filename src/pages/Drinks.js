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
          ? <DrinkCards number={ 12 } category={ category } />
          : <RandonDrinkCards number={ 12 } />
      }
      <Footer />
    </div>
  );
}
