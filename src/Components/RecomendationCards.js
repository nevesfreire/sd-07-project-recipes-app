/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <div>
        {recomendations.map((recomendation, index) => {
          if (type === 'bebida') {
            return (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <div>
                  <Link to={ `/comidas/${recomendation.idMeal}` }>
                    <img
                      src={ recomendation.strMealThumb }
                      data-testid={ `${index}-card-img` }
                      alt="Meal"
                    />
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      {recomendation.strMeal}
                    </h2>
                  </Link>
                </div>
              </div>
            );
          }
          return (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <div>
                <Link to={ `/bebidas/${recomendation.idDrink}` }>
                  <img
                    src={ recomendation.strDrinkThumb }
                    data-testid={ `${index}-card-img` }
                    alt="Drink"
                  />
                  <h2
                    data-testid={ `${index}-card-name` }
                  >
                    {recomendation.strDrink}
                  </h2>
                </Link>
              </div>
            </div>
          );
        })}
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
