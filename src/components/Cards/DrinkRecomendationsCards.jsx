import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import Card from './Card';

export default function DrinkRecomendationsCards(
  { number, testidImg, testidCard, testidTitle },
) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : drinks.filter((_, index) => index < number)
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <Card
                key={ index }
                link={ `/bebidas/${idDrink}` }
                title={ strDrink }
                img={ strDrinkThumb }
                testidImg={ `${index}${testidImg}` }
                testidCard={ `${index}${testidCard}` }
                testidTitle={ `${index}${testidTitle}` }
              />
            ))
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
