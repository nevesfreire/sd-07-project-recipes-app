import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import { factoryCard } from '../../Services';

export default function FoodCards({ category, number }) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const [loading, { meals }] = useFetchApi(URL);

  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(meals, number, false))
      }
    </div>

  );
}

FoodCards.defaultProps = {
  number: 12,
};

FoodCards.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number,
};
