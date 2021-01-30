import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './CardsAndCategorys';
import { useFetchApi } from '../hooks';

// Deveria estar no serveces

// https://pt.stackoverflow.com/questions/278442/regex-para-deixar-primeira-letra-de-nome-completo-mai%C3%BAsculo-mesmo-com-caractere
const UperCaseFirstLetter = (text) => text.toLowerCase()
  .replace(/(?:^|\s)(?!da|de|do)\S/g, (letter) => letter.toUpperCase());

function filterURL({ option, text }) {
  const newText = text.toLowerCase();
  switch (option) {
  case 'ingrediente':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${UperCaseFirstLetter(text)}`;
  case 'nome':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${newText}`;
  case 'primeiraLetra':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${newText}`;
  default:
    return text;
  }
}
// Deveria estar no serveces

const whatchCards = (drinks, number) => {
  if (!drinks) return (<h1>Não encontrado!</h1>);
  return drinks.filter((_, index) => index < number)
    .map(({ strDrink, strDrinkThumb, idDrink }, i) => (
      <Card
        id={ idDrink }
        title={ strDrink }
        img={ strDrinkThumb }
        key={ i }
      />
    ));
};

export default function SearchCards({ number, search }) {
  const URL = filterURL(search);
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    loading
      ? (<span>loading...</span>)
      : (whatchCards(drinks, number))
  );
}

SearchCards.propTypes = {
  number: PropTypes.number.isRequired,
  search: PropTypes.shape({
    option: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
