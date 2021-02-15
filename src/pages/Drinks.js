import React, { useContext } from 'react';
import { Header, Footer, CardsFactory, CategoryButtons } from '../components';
import { CupNodesContext } from '../contexts';
import { getURL } from '../Services';
import './css/recomendedScreen.css';

const newURL = (category, search) => {
  if (category) {
    return getURL({ category });
  } if (search.text) {
    return getURL({ search });
  }
  return getURL();
};

export default function Drinks() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  const URL = newURL(category, search);
  return (
    <div>
      <Header title="Bebidas" />
      <CategoryButtons number={ 5 } />
      <CardsFactory number={ 12 } URL={ URL } />
      <Footer />
    </div>
  );
}
