import React, { useContext } from 'react';
import {
  Header, Footer, RandonDrinkCards, DrinkCards, SearchDrinkCards,
} from '../components';
import { CupNodesContext } from '../contexts';

const whatchCards = (category, search) => {
  if (!search.text && !!category) {
    return (<DrinkCards number={ 12 } category={ category } />);
  } if (search.text) {
    return (<SearchDrinkCards search={ search } number={ 12 } />);
  }
  return (<RandonDrinkCards number={ 12 } />);
};

export default function Drinks() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Bebidas" />
      {whatchCards(category, search)}
      <Footer />
    </div>
  );
}
