import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import Card from './Card';

export default function FoodRecomendationsCards(
  { number, testidImg, testidCard, testidTitle },
) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [loading, { meals }] = useFetchApi(URL);
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : meals.filter((_, index) => index < number)
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <Card
                key={ index }
                link={ `/comidas/${idMeal}` }
                title={ strMeal }
                img={ strMealThumb }
                testidImg={ `${index}${testidImg}` }
                testidCard={ `${index}${testidCard}` }
                testidTitle={ `${index}${testidTitle}` }
              />
            ))
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
