import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import {
  fetchApi,
  allFoodIngredients,
  allDrinkIngredients,
  getFoodIngredients,
  getDrinkIngredients,
} from '../services/fetchApi';

const fetchIngredients = async (pathname, setIngredients) => {
  if (pathname.match('comidas')) {
    const newData = await fetchApi(allFoodIngredients);
    setIngredients(newData.meals);
  }
  if (pathname.match('bebidas')) {
    const newData = await fetchApi(allDrinkIngredients);
    setIngredients(newData.drinks);
  }
};

const recipeImg = (recipeThumb, recipeIndex) => (
  <img
    src={ recipeThumb }
    alt="recipe-img"
    data-testid={ `${recipeIndex}-card-img` }
    className="card-image"
  />
);

const recipeTextData = (recipeName, recipeIndex) => (
  <h3 data-testid={ `${recipeIndex}-card-name` } className="card-title">
    {recipeName}
  </h3>
);

const exploreIngredients = (parameter) => {
  const { pathname, ingredients, setState, history } = parameter;

  const correctPath = (pname) => {
    if (pname.match('comidas')) return 'comidas';
    if (pname.match('bebidas')) return 'bebidas';
  };

  const handleClick = async (ingredientName) => {
    console.log('clicado', ingredientName);
    if (pathname.match('comidas')) {
      const foodData = await fetchApi(getFoodIngredients(ingredientName));
      setState((s) => ({ ...s,
        data: {
          food: foodData.meals,
          ...s.data.beverage,
        },
      }));
    }
    if (pathname.match('bebidas')) {
      const beverageData = await fetchApi(getDrinkIngredients(ingredientName));
      setState((s) => ({ ...s,
        data: {
          ...s.data.food,
          beverage: beverageData.drinks,
        },
      }));
    }
    history.push(`/${correctPath(pathname)}`);
  };

  const maxIngredients = 12;

  return ingredients
    .filter((_ing, index) => index < maxIngredients)
    .map((ing, index) => {
      const Thumb = pathname.match('comidas')
        ? `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png`
        : `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png`;
      const Name = pathname.match('comidas')
        ? ing.strIngredient
        : ing.strIngredient1;
      console.log(Name);
      return (
        <Button
          key={ index }
          type="button"
          className="image-card"
          onClick={ () => handleClick(Name) }
        >
          <Paper
            className="paper-style"
            elevation={ 6 }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              {recipeImg(Thumb, index)}
              {recipeTextData(Name, index)}
            </div>
          </Paper>
        </Button>
      );
    });
};

export default function ExploreIngredientsBtns() {
  const { setState, setIngredient } = useContext(context);
  const [ingredients, setIngredients] = useState();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    fetchIngredients(pathname, setIngredients);
  }, [pathname]);

  // useEffect(() => {
  //   fetchIngredient(pathname, ingredient, setState);
  // }, [ingredient, pathname, setState]);

  if (!ingredients) return <div>Loading...</div>;
  const params = { pathname, ingredients, setState, history };

  return <div>{exploreIngredients(params)}</div>;
}
