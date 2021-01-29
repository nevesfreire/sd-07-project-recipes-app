import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { useFetchApi } from '../../hooks';

export default function CardsDrinkFiltred({ category, number }) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    loading
      ? (<span>loading...</span>)
      : (
        drinks.filter((_, index) => index < number)
          .map(({ strDrink, strDrinkThumb }, i) => (
            <Card title={ strDrink } img={ strDrinkThumb } key={ i } />
          ))
      )
  );
}

CardsDrinkFiltred.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
