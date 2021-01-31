import React from 'react';
import Card from './Card';
import LoadingCard from './LoadingCard';
import { useFetchApi } from '../../hooks';
import '../components.css';

export default function CardDrinkRandon() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<LoadingCard />)
          : (
            <Card
              title={ drinks[0].strDrink }
              img={ drinks[0].strDrinkThumb }
              id={ drinks[0].idDrink }
            />
          )
      }
    </div>
  );
}
