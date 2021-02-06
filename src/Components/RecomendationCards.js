/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
// import Card from './Card';
import RecipesContext from '../context/RecipesContext';

function RecomendationCards(props) {
  const { type } = props;
  const {
    isFetching,
    setIsFetching } = useContext(RecipesContext);
  const [recomendations, setRecomendations] = useState([]);
  const zero = 0;
  const six = 6;
  useEffect(() => {
    if (type === 'bebida') {
      const fetchFood = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const foods = await response.json();
        setRecomendations(foods.meals.slice(zero, six));
        setIsFetching(false);
      };
      fetchFood();
    } else {
      const fetchDrinks = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinks = await response.json();
        setRecomendations(drinks.drinks.slice(zero, six));
        setIsFetching(false);
      };
      fetchDrinks();
    }
  }, []);

  if (!isFetching) {
    return (
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center' } }
      >
        <h2>Recomendações:</h2>
        <Carousel>
          {recomendations.map((recomendation, index, array) => {
            const nextIndex = () => {
              if (index === array.length - 1) return zero;
              return index + 1;
            };
            if (type === 'bebida') {
              return (
                <Carousel.Item>
                  <div key={ index } data-testid={ `${index}-recomendation-card` }>
                    <div>
                      <Link to={ `/comidas/${recomendation.idMeal}` }>
                        <img
                          src={ recomendation.strMealThumb }
                          data-testid={ `${index}-card-img` }
                          alt="Meal"
                          style={ { margin: '15px', width: '50%', borderRadius: '15px' } }
                        />
                        <Button
                          data-testid={ `${index}-card-name` }
                          variant="info"
                        >
                          {recomendation.strMeal}
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div
                    key={ nextIndex() }
                    data-testid={ `${nextIndex()}-recomendation-card` }
                  >
                    <div>
                      <Link to={ `/comidas/${array[nextIndex()].idMeal}` }>
                        <img
                          src={ array[nextIndex()].strMealThumb }
                          data-testid={ `${nextIndex()}-card-img` }
                          alt="Meal"
                          style={ { margin: '15px', width: '50%', borderRadius: '15px' } }
                        />
                        <Button
                          data-testid={ `${nextIndex()}-card-name` }
                          variant="info"
                        >
                          {array[nextIndex()].strMeal}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Carousel.Item>
              );
            }
            return (
              <Carousel.Item key={ index }>
                <div data-testid={ `${index}-recomendation-card` }>
                  <div>
                    <Link to={ `/comidas/${recomendation.idDrink}` }>
                      <img
                        src={ recomendation.strDrinkThumb }
                        data-testid={ `${index}-card-img` }
                        alt="Drink"
                        style={ { margin: '15px', width: '50%', borderRadius: '15px' } }
                      />
                      <Button
                        data-testid={ `${index}-card-name` }
                        variant="info"
                      >
                        {recomendation.strDrink}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div
                  key={ nextIndex() }
                  data-testid={ `${nextIndex()}-recomendation-card` }
                >
                  <div>
                    <Link
                      to={ `/comidas/${array[nextIndex()].idDrink}` }
                    >
                      <img
                        src={ array[nextIndex()].strDrinkThumb }
                        data-testid={ `${nextIndex()}-card-img` }
                        alt="Drink"
                        style={ { margin: '15px', width: '50%', borderRadius: '15px' } }
                      />
                      <Button
                        variant="info"
                        data-testid={ `${nextIndex()}-card-name` }
                      >
                        {array[nextIndex()].strDrink}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

RecomendationCards.defaultProps = {
  type: 'comida',
};

RecomendationCards.propTypes = {
  type: PropTypes.string,
};

export default RecomendationCards;
