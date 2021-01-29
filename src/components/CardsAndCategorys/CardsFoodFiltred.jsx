import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { useFetchApi } from '../../hooks';

export default function CardsFoodFiltred({ category, number }) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const [loading, { meals }] = useFetchApi(URL);
  return (
    loading
      ? (<span>loading...</span>)
      : (
        meals.filter((_, index) => index < number)
          .map(({ strMeal, strMealThumb }, i) => (
            <Card title={ strMeal } img={ strMealThumb } key={ i } />
          ))
      )
  );
}

CardsFoodFiltred.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
