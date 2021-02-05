import React, { useContext } from 'react';
import context from '../contextAPI/context';
import Card from './Card';

const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const ListCard = () => {
  const { state } = useContext(context);
  const { data } = state;
  const maxRecipesNumber = 12;
  let recipes = [];
  let recipeStr = '';
  console.log(data);
  if (data.meals) {
    const { meals } = data;
    recipes = [...meals];
    recipeStr = 'strMeal';
  } else {
    const { drinks } = data;
    recipes = [...drinks];
    recipeStr = 'strDrink';
  }

  if (recipes.length > 1) {
    return (
      recipes.filter((_recipe, index) => index < maxRecipesNumber)
        .map((recipe, index) => (<Card
          key={ recipe[findMatch('id', recipe)] }
          pathname={ Object.keys(data) }
          id={ recipe[findMatch('id', recipe)] }
          recipeName={ recipe[findMatch(recipeStr, recipe)] }
          recipeThumb={ recipe[findMatch(/Thumb/, recipe)] }
          recipeIndex={ index }
        />))
    );
  }

  return (console.log('perdeu'));
};

export default ListCard;
