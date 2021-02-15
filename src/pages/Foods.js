import React, { useContext } from 'react';
import { Header, Footer, CategoryButtons, CardsFactory } from '../components';
import { CupNodesContext } from '../contexts';
import { getURL } from '../Services';
import './css/recomendedScreen.css';

const newURL = (category, search) => {
  const drink = false;
  if (category) {
    return getURL({ category }, drink);
  } if (search.text) {
    return getURL({ search }, drink);
  }
  return getURL({}, drink);
};

export default function Foods() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  const URL = newURL(category, search);
  return (
    <div className="cardsList">
      <Header title="Comidas" />
      <CategoryButtons number={ 5 } drink={ false } />
      <CardsFactory number={ 12 } URL={ URL } drink={ false } />
      <Footer />
    </div>
  );
}
