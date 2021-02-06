import React, { useContext } from 'react';
import {
  Header, Footer, CardsFactory, CategoryButtons,
} from '../components';
import { CupNodesContext } from '../contexts';

function filterURL({ option, text }) {
  const newText = text.toLowerCase();
  switch (option) {
  case 'ingrediente':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text.toLowerCase()}`;
  case 'nome':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${newText}`;
  case 'primeiraLetra':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
  default:
    return text;
  }
}

const whatchCards = (category, search) => {
  if (!search.text && !!category) {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    return (<CardsFactory number={ 12 } URL={ URL } />);
  } if (search.text) {
    const URL = filterURL(search);
    return (<CardsFactory number={ 12 } URL={ URL } />);
  }
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return (<CardsFactory number={ 12 } URL={ URL } />);
};

export default function Drinks() {
  const { filterDates: { category, search } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Bebidas" />
      <CategoryButtons number={ 5 } />
      {whatchCards(category, search)}
      <Footer />
    </div>
  );
}
