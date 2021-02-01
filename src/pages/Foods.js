import React, { useContext } from 'react';
import {
  Header, Footer, FoodRecomendationsCards, FoodCards, SearchFoodCards, CategoryFood,
} from '../components';
import { CupNodesContext } from '../contexts';

const whatchCards = (category, search) => {
  if (!search.text && !!category) {
    return (<FoodCards number={ 12 } category={ category } />);
  } if (search.text) {
    return (<SearchFoodCards search={ search } number={ 12 } />);
  }
  return (
    <FoodRecomendationsCards
      number={ 12 }
      testidImg="-card-img"
      testidCard="-recipe-card"
      testidTitle="-card-name"
    />
  );
};

export default function Foods() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Comidas" />
      <CategoryFood number={ 5 } />
      {whatchCards(category, search)}
      <Footer />
    </div>
  );
}
