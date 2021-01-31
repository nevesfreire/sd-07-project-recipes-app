import React from 'react';
import PropTypes from 'prop-types';
import LoadingCard from './LoadingCard';
import { useFetchApi } from '../../hooks';
import { UperCaseFirstLetter, factoryCard } from '../../Services';

function filterURL({ option, text }) {
  const newText = text.toLowerCase().split(' ', '_');
  switch (option) {
  case 'ingrediente':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${UperCaseFirstLetter(text)}`;
  case 'nome':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${newText}`;
  case 'primeiraLetra':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
  default:
    return text;
  }
}

export default function SearchDrinkCards({ number, search }) {
  const URL = filterURL(search);
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(drinks, number, true))
      }
    </div>
  );
}

SearchDrinkCards.propTypes = {
  number: PropTypes.number.isRequired,
  search: PropTypes.shape({
    option: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
