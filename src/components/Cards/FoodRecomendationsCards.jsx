import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import { factoryCard } from '../../Services';

export default function FoodRecomendationsCards(
  { number, testidImg, testidCard, testidTitle },
) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [loading, { meals }] = useFetchApi(URL);
  const parameters = { testidImg, testidCard, testidTitle };
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(meals, number, false, parameters))
      }
    </div>
  );
}

FoodRecomendationsCards.defaultProps = {
  number: 6,
};

FoodRecomendationsCards.propTypes = {
  number: PropTypes.number,
  testidImg: PropTypes.string.isRequired,
  testidCard: PropTypes.string.isRequired,
  testidTitle: PropTypes.string.isRequired,
};
