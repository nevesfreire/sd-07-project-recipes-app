import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import { factoryCard } from '../../Services';

export default function DrinkCards({ category, number }) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const [loading, { drinks }] = useFetchApi(URL);

  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : factoryCard(drinks, number, true)
      }
    </div>
  );
}

DrinkCards.defaultProps = {
  number: 12,
};

DrinkCards.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number,
};
