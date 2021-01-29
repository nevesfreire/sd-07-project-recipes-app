import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../hooks';
import { Card } from './CardsAndCategorys';

export default function Cards({ category, number }) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<span>loading...</span>)
          : (
            drinks.filter((_, index) => index < number)
              .map(({ strDrink, strDrinkThumb }, i) => (
                <Card title={ strDrink } img={ strDrinkThumb } key={ i } />
              ))
          )
      }
    </div>
  );
}

Cards.defaultProps = {
  number: 12,
};

Cards.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number,
};
