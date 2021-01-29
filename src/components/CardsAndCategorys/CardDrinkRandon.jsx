import React from 'react';
import { useFetchApi } from '../../hooks';
import '../components.css';

export default function CardDrinkRandon() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<span>loading...</span>)
          : (
            <div className="CardFood">
              <h3>{drinks[0].strDrink}</h3>
              <img src={ drinks[0].strDrinkThumb } alt="foto" />
            </div>
          )
      }
    </div>
  );
}
