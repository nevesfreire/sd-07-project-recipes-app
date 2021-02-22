import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
// import { Button } from '@material-ui/core';
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
const fetchIngredient = async (pathname, ingredient, setState) => {
  let newData = '';
  if (pathname.match('comidas')) {
    newData = await fetchApi(getFoodIngredients(ingredient));
    setState((s) => ({
      ...s,
      data: { ...s.data, food: newData.meals },
      filtered: ingredient,
    }
    ));
  }
  if (pathname.match('bebidas')) {
    newData = await fetchApi(getDrinkIngredients(ingredient));
    setState((s) => ({
      ...s,
      data: { ...s.data, beverage: newData.drinks },
      filtered: ingredient,
    }
    ));
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

const exploreIngredients = (pathname, ingredients, setIngredient) => {
  const handleClick = (ingredientName) => {
    console.log(ingredientName);
    setIngredient(ingredientName);
  };

  const maxIngredients = 12;
  const correctPath = (pname) => {
    if (pname.match('comidas')) return 'comidas';
    if (pname.match('bebidas')) return 'bebidas';
  };

  return ingredients
    .filter((_ingredient, index) => index < maxIngredients)
    .map((ingredient, index) => {
      const Thumb = pathname.match('comidas')
        ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
        : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
      const Name = pathname.match('comidas')
        ? ingredient.strIngredient
        : ingredient.strIngredient1;
      console.log(Name);
      return (
        <Link
          key={ index }
          role="button"
          to={ `/${correctPath(pathname)}` }
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
        </Link>
      );
    });
};

export default function ExploreIngredientsBtns() {
  const { setState } = useContext(context);
  const [ingredients, setIngredients] = useState();
  const [ingredient, setIngredient] = useState('');
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    fetchIngredients(pathname, setIngredients);
  }, [pathname]);

  useEffect(() => {
    fetchIngredient(pathname, ingredient, setState);
  }, [ingredient, pathname, setState]);

  if (!ingredients) return <div>Loading...</div>;

  return <div>{exploreIngredients(pathname, ingredients, setIngredient)}</div>;
}
