import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import { factoryCard } from '../../Services';

export default function DrinkRecomendationsCards(
  { number, testidImg, testidCard, testidTitle },
) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [loading, { drinks }] = useFetchApi(URL);
  const parameters = { testidImg, testidCard, testidTitle };
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(drinks, number, true, parameters))
      }
    </div>
  );
}

DrinkRecomendationsCards.defaultProps = {
  number: 6,
};

DrinkRecomendationsCards.propTypes = {
  number: PropTypes.number,
  testidImg: PropTypes.string.isRequired,
  testidCard: PropTypes.string.isRequired,
  testidTitle: PropTypes.string.isRequired,
};
