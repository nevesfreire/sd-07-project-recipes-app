import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { mealsAPI, drinksAPI } from '../services';
import FoodAppContext from '../context/FoodAppContext';
import useRecipes from '../hooks/useRecipes';

function Recomendations({ recipes }) {
  const { mealsData, setMealsData,
    drinksData, setDrinksData } = useContext(FoodAppContext);

  const history = {
    location: {
      pathname: `/${recipes === 'comidas' ? 'bebidas' : 'comidas'}`,
    },
  };

  const [handleToDetail, /* recipes */, zero] = useRecipes(history);
  const six = 6;

  const fetchMealsRecipes = async () => {
    const { meals } = await mealsAPI('', '');
    setMealsData(meals);
  };

  const fetchDrinksRecipes = async () => {
    const { drinks } = await drinksAPI('', '');
    setDrinksData(drinks);
  };

  const fetchRecipes = recipes === 'comidas' ? fetchMealsRecipes
    : fetchDrinksRecipes;

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (recipes !== 'comidas') {
    return (
      <div className="recomendations">
        <h3>Recomendations</h3>
        <div className="div-recomendations">
          {mealsData && mealsData.slice(zero, six).map(
            ({ idMeal, strMeal, strCategory, strMealThumb }, index) => (
              <button
                key={ idMeal }
                type="button"
                data-testid={ `${index}-recomendation-card` }
                className="item-recommended"
                onClick={ () => handleToDetail(idMeal) }
              >
                <img src={ strMealThumb } alt="recipes-meals" />
                <p>{ strCategory }</p>
                <h4 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h4>
              </button>
            ),
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="recomendations">
      <h3>Recomendations</h3>
      <div className="div-recomendations">
        {drinksData && drinksData.slice(zero, six).map(
          ({ idDrink, strDrink, strAlcoholic, strDrinkThumb }, index) => (
            <button
              key={ idDrink }
              type="button"
              data-testid={ `${index}-recomendation-card` }
              className="item-recommended"
              onClick={ () => handleToDetail(idDrink) }
            >
              <img src={ strDrinkThumb } alt="recipes-meals" />
              <p>{ strAlcoholic }</p>
              <h4 data-testid={ `${index}-recomendation-title` }>{ strDrink }</h4>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default Recomendations;
