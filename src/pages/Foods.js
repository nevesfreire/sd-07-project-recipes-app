import React, { useContext } from 'react';
import {
  Header, Footer, RandonFoodCards, FoodCards, SearchFoodCards, CategoryFood,
} from '../components';
import { CupNodesContext } from '../contexts';

const whatchCards = (category, search) => {
  if (!search.text && !!category) {
    return (<FoodCards number={ 12 } category={ category } />);
  } if (search.text) {
    return (<SearchFoodCards search={ search } number={ 12 } />);
  }
  return (<RandonFoodCards number={ 12 } />);
};

export default function Foods() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Comidas" />
      <CategoryFood />
      {whatchCards(category, search)}
      <Footer />
    </div>
  );
}
