import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { fetchApi, allFoodIngredients, allDrinkIngredients } from '../services/fetchApi';

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

const exploreIngredients = (history, pathname, ingredients) => {
  const maxIngredients = 12;
  return ingredients
    .filter((_ingredient, index) => index < maxIngredients)
    .map((ingredient, index) => {
      const Thumb = pathname.match('comidas')
        ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
        : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
      const Name = pathname.match('comidas')
        ? ingredient.strIngredient
        : ingredient.strIngredient1;
      return (
        <Paper key={ index } className="paper-style" elevation={ 6 }>
          <Link to="/" replace>
            <div data-testid={ `${index}-ingredient-card` }>
              {recipeImg(Thumb, index)}
              {recipeTextData(Name, index)}
            </div>
          </Link>
        </Paper>
      );
    });
};

export default function ExploreIngredientsBtns() {
  const [ingredients, setIngredients] = useState();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    fetchIngredients(pathname, setIngredients);
  }, [pathname]);

  if (!ingredients) return <div>Loading...</div>;

  return <div>{exploreIngredients(history, pathname, ingredients)}</div>;
}
