import React from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import LoadingCard from './LoadingCard';
import Card from './Card';

export default function RecomendationsCards({ name, number }) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const [loading, { meals = [] }] = useFetchApi(URL);
  console.log(!name);
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
                testidImg={ `${strMeal}-recomendation-img` }
                testidCard={ `${index}-recomendation-card` }
                testidTitle={ `${index}-recomendation-title` }
              />
            ))
      }
    </div>
  );
}

RecomendationsCards.defaultProps = {
  number: 6,
};

RecomendationsCards.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
};
