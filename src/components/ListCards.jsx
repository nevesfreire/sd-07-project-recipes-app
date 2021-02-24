import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
// import { fetchApi, allFood, allDrink } from '../services/fetchApi';
// import siteMap from '../helpers/siteMap';
import Card from './Card';

// stackOverflow -> https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const newCards = async (pathname, setCards, setRecipeStr, state) => {
  if (pathname === '/comidas') {
    setCards(state.data.food);
    setRecipeStr(state.str.food);
  } else if (pathname === '/bebidas') {
    setCards(state.data.beverage);
    setRecipeStr(state.str.beverage);
  }
};

const ListCards = () => {
  const { state } = useContext(context);
  const [cards, setCards] = useState([]);
  const [recipeStr, setRecipeStr] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;
  const maxRecipesNumber = 12;

  useEffect(() => {
    newCards(pathname, setCards, setRecipeStr, state);
  }, [pathname, state]);

  console.log(state);
  if (!cards) return <div>Loading...</div>;

  return (
    cards.filter((_recipe, index) => index < maxRecipesNumber)
      .map((recipe, index) => (
        <Card
          key={ recipe[findMatch('id', recipe)] }
          pathname={ pathname }
          id={ recipe[findMatch('id', recipe)] }
          Name={ recipe[findMatch(recipeStr, recipe)] }
          Thumb={ recipe[findMatch(/Thumb/, recipe)] }
          Index={ index }
          Test="recipe-card"
        />
      ))
  );
};

export default ListCards;
