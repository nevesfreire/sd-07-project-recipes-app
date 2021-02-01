import React, { useContext } from 'react';
import {
  Header, Footer, CategoryFood, CardsFactory,
} from '../components';
import { CupNodesContext } from '../contexts';
import { UperCaseFirstLetter } from '../Services';

function filterURL({ option, text }) {
  const newText = text.toLowerCase().split(' ', '_');
  switch (option) {
  case 'ingrediente':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${UperCaseFirstLetter(text)}`;
  case 'nome':
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${newText}`;
  case 'primeiraLetra':
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
  default:
    return text;
  }
}

const whatchCards = (category, search) => {
  if (!search.text && !!category) {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    return (<CardsFactory URL={ URL } drink={ false } number={ 12 } />);
  } if (search.text) {
    const URL = filterURL(search);
    return (<CardsFactory URL={ URL } drink={ false } number={ 12 } />);
  }
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return (<CardsFactory URL={ URL } drink={ false } number={ 12 } />);
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
