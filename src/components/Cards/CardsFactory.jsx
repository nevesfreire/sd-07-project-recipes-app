import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import { LoadingCard } from '../Contructors';
import { factoryCard } from '../../Services';

export default function CardsFactory(
  { URL, number, testidImg, testidCard, testidTitle, drink },
) {
  const [loading, result] = useFetchApi(URL);
  const resultArr = drink ? result.drinks : result.meals;
  const parameters = testidCard ? { testidImg, testidCard, testidTitle } : '';
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(resultArr, number, drink, parameters))
      }
    </div>
  );
}

CardsFactory.defaultProps = {
  number: 12,
  drink: true,
  testidImg: '',
  testidCard: '',
  testidTitle: '',
};

CardsFactory.propTypes = {
  number: PropTypes.number,
  drink: PropTypes.bool,
  URL: PropTypes.string.isRequired,
  testidImg: PropTypes.string,
  testidCard: PropTypes.string,
  testidTitle: PropTypes.string,
};
