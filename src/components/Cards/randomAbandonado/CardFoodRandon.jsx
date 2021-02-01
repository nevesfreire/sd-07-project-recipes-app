import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import LoadingCard from '../LoadingCard';
import { useFetchApi } from '../../../hooks';
import '../components.css';

export default function CardFoodRandon({ testidCard, testidImg, testidTitle }) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const [loading, { meals }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<LoadingCard />)
          : (
            <Card
              link={ `/comidas/${meals[0].idMeal}` }
              title={ meals[0].strMeal }
              img={ meals[0].strMealThumb }
              id={ meals[0].idMeal }
              testidCard={ testidCard }
              testidImg={ testidImg }
              testidTitle={ testidTitle }
            />
          )
      }
    </div>
  );
}

CardFoodRandon.defaultProps = {
  testidCard: '',
  testidImg: '',
  testidTitle: '',
};

CardFoodRandon.propTypes = {
  testidCard: PropTypes.string,
  testidImg: PropTypes.string,
  testidTitle: PropTypes.string,
};
