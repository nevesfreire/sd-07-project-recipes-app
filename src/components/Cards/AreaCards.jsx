import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import { factoryCard } from '../../Services';

export default function AreaCards({ area, number }) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
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

AreaCards.defaultProps = {
  number: 12,
};

AreaCards.propTypes = {
  area: PropTypes.string.isRequired,
  number: PropTypes.number,
};
