import React from 'react';
import Card from './Card';
import LoadingCard from './LoadingCard';
import { useFetchApi } from '../../hooks';
import '../components.css';

export default function CardFoodRandon() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const [loading, { meals }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<LoadingCard />)
          : (
            <Card
              title={ meals[0].strMeal }
              img={ meals[0].strMealThumb }
              id={ meals[0].idMeal }
            />
          )
      }
    </div>
  );
}
