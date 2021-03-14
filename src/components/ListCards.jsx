/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import resetCountdown from '../helpers/resetCountdown';
import takeIdOut from '../helpers/takeIdOut';
// import { fetchApi, allFood, allDrink } from '../services/fetchApi';
// import siteMap from '../helpers/siteMap';
import Card from './Card';

// stackOverflow -> https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const newCards = async (pathname, setCards, setRecipeStr, state) => {
  if (pathname.match('comidas')) {
    setCards(state.data.food);
    setRecipeStr(state.str.food);
  } else if (pathname.match('bebidas')) {
    setCards(state.data.beverage);
    setRecipeStr(state.str.beverage);
  }
};

const ListCards = () => {
  const isOver = 0;
  const oneSecond = 1000;
  let myId = '';

  const { setHasFinished, setActive, active, time, setTime, state } = useContext(context);
  const [cards, setCards] = useState([]);
  const [recipeStr, setRecipeStr] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;
  const maxRecipesNumber = 12;

  useEffect(() => {
    newCards(pathname, setCards, setRecipeStr, state);
  }, [pathname, state]);

  const myPathName = pathname;

  useEffect(() => {
    if (active && time > isOver) {
      setTimeout(() => {
        setTime(time - 1);
      }, oneSecond);
    } else if (active && time === isOver) {
      setHasFinished(true);
      setActive(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, time]);

  if (!active && !cards && time === isOver && setHasFinished) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    resetCountdown(setActive, setTime);
  }

  if (!cards) return <div>Loading...</div>;

  if (cards.length !== isOver) {
    myId = takeIdOut(pathname, cards);
  }

  return cards.length > 1 || cards.length === isOver ? (
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
  ) : <Redirect to={ `${myPathName}/${myId}` } />;
};

export default ListCards;
