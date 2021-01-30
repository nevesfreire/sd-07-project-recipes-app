import React, { useContext } from 'react';
import {
  Header, Footer, RandonFoodCards, FoodCards, SearchFoodCards,
} from '../components';
import { CupNodesContext } from '../contexts';

const whatchCards = (category, search) => {
  if (!search.text && !!category) {
    return (<FoodCards number={ 12 } category={ category } />);
  } if (search.text) {
    return (<SearchFoodCards search={ search } number={ 5 } />);
  }
  return (<RandonFoodCards number={ 12 } />);
};

export default function Foods() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Comidas" />
      {whatchCards(category, search)}
      <Footer />
    </div>
  );
}
