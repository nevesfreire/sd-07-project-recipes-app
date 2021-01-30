import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../hooks';
import { CategoryDrink } from './CardsAndCategorys';
import { factoryCard } from '../Services';

export default function Cards({ category, number }) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const [loading, { drinks }] = useFetchApi(URL);

  return (
    <div>
      <CategoryDrink />
      {
        loading
          ? (<span>loading...</span>)
          : factoryCard(drinks, number, true)
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
