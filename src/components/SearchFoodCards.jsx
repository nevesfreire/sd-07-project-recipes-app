import React from 'react';
import PropTypes from 'prop-types';
import { CategoryFood } from './CardsAndCategorys';
import { useFetchApi } from '../hooks';
import { UperCaseFirstLetter, factoryCard } from '../Services';

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

export default function SearchFoodCards({ number, search }) {
  const URL = filterURL(search);
  const [loading, { meals }] = useFetchApi(URL);
  return (
    <div>
      <CategoryFood />
      {
        loading
          ? (<span>loading...</span>)
          : (factoryCard(meals, number, false))
      }
    </div>
  );
}

SearchFoodCards.propTypes = {
  number: PropTypes.number.isRequired,
  search: PropTypes.shape({
    option: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
