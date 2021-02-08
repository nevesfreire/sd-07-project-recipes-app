 import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import context from '../contextAPI/context';
import { fetchApi, allFood, allDrink } from '../services/fetchApi';
// import siteMap from '../helpers/siteMap';
import Card from './Card';

const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const newFunc = async (pathname, setRecipes, setRecipeStr) => {
  if (pathname === '/comidas') {
    const data = await fetchApi(allFood);
    const { meals } = data;
    console.log(meals);
    setRecipes(meals);
    setRecipeStr('strMeal');
  } else if (pathname === '/bebidas') {
    const data = await fetchApi(allDrink);
    const { drinks } = data;
    setRecipeStr('strDrink');
    setRecipes(drinks);
  }
};

const ListCards = () => {
  // const { state, setRecipesUrl } = useContext(context);
  const [recipes, setRecipes] = useState();
  const [recipeStr, setRecipeStr] = useState();

  const history = useHistory();
  const { location: { pathname } } = history;

  const maxRecipesNumber = 12;

  useEffect(() => {
    newFunc(pathname, setRecipes, setRecipeStr);
  }, [pathname]);

  if (!recipes) return <div>Loading...</div>;
  return (
    recipes.filter((_recipe, index) => index < maxRecipesNumber)
      .map((recipe, index) => (<Card
        key={ recipe[findMatch('id', recipe)] }
        pathname={ pathname }
        id={ recipe[findMatch('id', recipe)] }
        recipeName={ recipe[findMatch(recipeStr, recipe)] }
        recipeThumb={ recipe[findMatch(/Thumb/, recipe)] }
        recipeIndex={ index }
      />))
  );
};

export default ListCards;
