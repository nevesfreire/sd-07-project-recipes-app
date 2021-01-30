import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

import Context from '../../Context';
import Meals from '../../services/meals-api';
import Drinks from '../../services/cocktails-api';
import Recipe from '../Recipe';

const filterFoodKeys = (food) => {
  const objKeys = Object.keys(food);

  const filteredIngredientKeys = objKeys.filter((key) => key.includes('strIngredient'));
  const filteredMeasureKeys = objKeys.filter((key) => key.includes('strMeasure'));

  const ingredientsObj = filteredIngredientKeys.map((key) => food[key]);
  const measuresObj = filteredMeasureKeys.map((key) => food[key]);

  const ingredientsObjFiltered = ingredientsObj.filter((ing) => ing);
  const measuresObjFiltered = measuresObj.filter((ing) => ing);

  return [ingredientsObjFiltered, measuresObjFiltered];
};

const RecipeDetails = ({ page }) => {
  const { id } = useParams();
  const { verifyInProgress, checkFavorite } = useContext(Context);

  const [meal, setMeal] = useState({});
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isInProgress = verifyInProgress(id, page);
    if (isInProgress) {
      setInProgress(true);
    }
  }, [verifyInProgress, id, page]);

  useEffect(() => {
    const isFavorite = checkFavorite(id);
    if (isFavorite) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [id, checkFavorite]);

  useEffect(() => {
    const limitToShow = 6;

    if (page === 'meal') {
      Meals.getMealDetailsById(id)
        .then((res) => {
          const [filteredIngredients, filteredMeasures] = filterFoodKeys(res);
          setIngredients(filteredIngredients);
          setMeasures(filteredMeasures);
          setMeal(res);
          setIsFetching(false);
        })
        .catch((err) => console.log(err));

      Drinks.getCocktails(limitToShow)
        .then((res) => setDrinks(res))
        .catch((err) => console.log(err));
    }

    if (page === 'drink') {
      Drinks.getCocktailDetailsById(id)
        .then((res) => {
          const [filteredIngredients, filteredMeasures] = filterFoodKeys(res);
          setIngredients(filteredIngredients);
          setMeasures(filteredMeasures);
          setDrink(res);
          setIsFetching(false);
        })
        .catch((err) => console.log(err));

      Meals.getMeals(limitToShow)
        .then((res) => setMeals(res))
        .catch((err) => console.log(err));
    }
  }, [page, id]);

  if (isFetching) {
    return <h1>Loading details...</h1>;
  }

  const commonProps = {
    page,
    favorite,
    ingredients,
    meals,
    drinks,
    measures,
    inProgress,
    id,
  };

  return (
    <Recipe
      recipe={ page === 'meal' ? meal : drink }
      commonProps={ commonProps }
    />
  );
};

RecipeDetails.propTypes = { page: PropTypes.string.isRequired };

export default RecipeDetails;
