import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { requestApiDrinkDetails } from '../services/requestDrink';
import { recommendFoodsList } from '../services/requestFood';
import { loadState } from '../services/localStorage';

// https://github.com/tryber/sd-07-project-recipes-app/blob/main-group-23;
// slick-carrousel;

const filterIngredientsAndMeasures = (
  detailsEntries,
  filteredMeasures,
  filteredIngredients,
) => {
  const ingredientRegex = /strIngredient/i;
  const measureRegex = /strMeasure/i;

  detailsEntries.forEach((currentArray) => {
    if (ingredientRegex.test(currentArray[0]) && currentArray[1] !== null) {
      filteredIngredients.push(currentArray[1]);
    }
    if (measureRegex.test(currentArray[0]) && currentArray[1] !== null) {
      filteredMeasures.push(currentArray[1]);
    }
  });
};

function DetalhesBebidas({ match: { params: { id } } }) {
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredientsAndMeasure, setIngredientsAndMeasures] = useState([]);
  const [recommendedForThisDrink, setRecommendedForThisDrink] = useState([]);
  const [startRecipeButton, setStartRecipeButton] = useState('Iniciar Receita');

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const getIngredientsAndMeasure = () => {
    const detailsEntries = Object.entries(drinkDetails);
    const expectedArray = [];
    const filteredIngredients = [];
    const filteredMeasures = [];

    filterIngredientsAndMeasures(detailsEntries, filteredMeasures, filteredIngredients);

    filteredIngredients.forEach((ingredient, index) => {
      expectedArray.push(`${ingredient} ${
        filteredMeasures[index] ? filteredMeasures[index] : ''
      }`);
    });

    setIngredientsAndMeasures(expectedArray);
  };

  const getTheRecommendedFood = async () => {
    if (drinkDetails) {
      const firstIndex = 0;
      const lastIndex = 6;
      const recommendedDrinksArray = await recommendFoodsList();
      const expectedArray = recommendedDrinksArray.meals.slice(firstIndex, lastIndex);
      setRecommendedForThisDrink(expectedArray);
    }
  };

  const setStateOfStartRecipe = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const loadStorage = loadState('inProgressRecipes', '');
      if (loadStorage.cocktails[id] !== undefined) {
        setStartRecipeButton('Continuar Receita');
      }
    }
  };

  useEffect(() => {
    getIngredientsAndMeasure();
    getTheRecommendedFood();
    setStateOfStartRecipe();
  }, [drinkDetails]);

  const callMainApi = async () => {
    const apiResult = await requestApiDrinkDetails(id);
    setDrinkDetails(apiResult[0]);
  };

  useEffect(() => {
    callMainApi();
  }, []);

  if (!drinkDetails) return <span>Loading...</span>;

  return (
    <div>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        deta-testid="recipe-photo"
      />
      <div>
        <div>
          <h2 data-testid="recipe-title">
            { drinkDetails.strDrink }
          </h2>
          <hr />
          <div data-testid="recipe-category">
            <span>{ drinkDetails.strAlcoholic }</span>
            <br />
            <span>{ drinkDetails.strCategory }</span>
          </div>
        </div>
      </div>
      <div>
        <p>Ingredients</p>
        <div>
          {
            ingredientsAndMeasure.map((element, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `ingredient${index}` }
              >
                { element }
              </p>
            ))
          }
        </div>
        <p>Instructions</p>
        <div>
          <p data-testid="instructions">
            { drinkDetails.strInstructions }
          </p>
        </div>
      </div>
      <div>
        <Slider { ...sliderSettings }>
          {
            recommendedForThisDrink.map((food, index) => (
              <div
                key={ food }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  src={ food.strMealThumb }
                  alt={ food.strMealThumb }
                />
                <h3 data-testid={ `${index}-recomendation-title` }>{ food.strMeal }</h3>
              </div>
            ))
          }
        </Slider>
      </div>
      <div>
        <Link to={ `bebidas/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            { startRecipeButton }
          </button>
        </Link>
      </div>
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesBebidas;
