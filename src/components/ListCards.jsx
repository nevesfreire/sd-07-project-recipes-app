import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi, allFood, allDrink } from '../services/fetchApi';
// import siteMap from '../helpers/siteMap';
import Card from './Card';

// stackOverflow -> https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const newFunc = async (pathname, setState, data) => {
  if (!data) {
    if (pathname === '/comidas') {
      const newRecipes = await fetchApi(allFood);
      console.log('Recipes', newRecipes);
      setState((s) => ({
        ...s,
        data: newRecipes.meals,
        recipeStr: 'strMeal',
      }));
    } else if (pathname === '/bebidas') {
      const newRecipes = await fetchApi(allDrink);
      setState((s) => ({
        ...s,
        data: newRecipes.drinks,
        recipeStr: 'strDrink',
      }));
    }
  }
  // if (pathname === '/comidas') {
  //   console.log('Category', data);
  //   setState((s) => ({ ...s, recipeStr: 'strMeal' }));
  // } else if (pathname === '/bebidas') {
  //   setState((s) => ({ ...s, recipeStr: 'strDrink' }));
  // }
};

const ListCards = () => {
  const { state, setState } = useContext(context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const { data } = state;
  const maxRecipesNumber = 12;

  useEffect(() => {
    newFunc(pathname, setState, data);
  }, [pathname, data, setState]);

  if (!data) return <div>Loading...</div>;
  console.log(data);
  return (
    data.filter((_recipe, index) => index < maxRecipesNumber)
      .map((recipe, index) => (
        <Card
          key={ recipe[findMatch('id', recipe)] }
          pathname={ pathname }
          id={ recipe[findMatch('id', recipe)] }
          Name={ recipe[findMatch(state.recipeStr, recipe)] }
          Thumb={ recipe[findMatch(/Thumb/, recipe)] }
          Index={ index }
          Test="recipe-card"
        />
      ))
  );
};

export default ListCards;
