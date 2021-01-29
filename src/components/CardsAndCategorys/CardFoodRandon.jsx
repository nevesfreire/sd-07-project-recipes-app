import React from 'react';
import { useFetchApi } from '../../hooks';
import '../components.css';

export default function CardFoodRandon() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const [loading, { meals }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<span>loading...</span>)
          : (
            <div className="CardFood">
              <h3>{meals[0].strMeal}</h3>
              <img src={ meals[0].strMealThumb } alt="foto" />
            </div>
          )
      }
    </div>
  );
}
