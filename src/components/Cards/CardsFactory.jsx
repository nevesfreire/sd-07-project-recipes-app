import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import { factoryCard } from '../../Services';

export default function CardsFactory(
  { URL, number, testidImg, testidCard, testidTitle, drink },
) {
  const [loading, { drinks }] = useFetchApi(URL);
  const parameters = testidCard ? { testidImg, testidCard, testidTitle } : '';
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(drinks, number, drink, parameters))
      }
    </div>
  );
}

CardsFactory.defaultProps = {
  number: 12,
  drink: true,
};

CardsFactory.propTypes = {
  number: PropTypes.number,
  drink: PropTypes.bool,
  URL: PropTypes.string.isRequired,
  testidImg: PropTypes.string.isRequired,
  testidCard: PropTypes.string.isRequired,
  testidTitle: PropTypes.string.isRequired,
};
