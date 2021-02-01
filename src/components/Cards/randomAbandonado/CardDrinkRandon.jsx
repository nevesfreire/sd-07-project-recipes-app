import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import LoadingCard from '../LoadingCard';
import { useFetchApi } from '../../../hooks';
import '../components.css';

export default function CardDrinkRandon({ testidCard, testidImg, testidTitle }) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div>
      {
        loading
          ? (<LoadingCard />)
          : (
            <Card
              link={ `/bebidas/${drinks[0].idDrink}` }
              title={ drinks[0].strDrink }
              img={ drinks[0].strDrinkThumb }
              id={ drinks[0].idDrink }
              testidCard={ testidCard }
              testidImg={ testidImg }
              testidTitle={ testidTitle }
            />
          )
      }
    </div>
  );
}

CardDrinkRandon.defaultProps = {
  testidCard: '',
  testidImg: '',
  testidTitle: '',
};

CardDrinkRandon.propTypes = {
  testidCard: PropTypes.string,
  testidImg: PropTypes.string,
  testidTitle: PropTypes.string,
};
