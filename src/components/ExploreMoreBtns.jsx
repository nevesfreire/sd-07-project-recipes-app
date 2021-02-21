import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { fetchApi, getRandomFood, getRandomDrink } from '../services/fetchApi';

const fetchRandom = async (pathname, setIdRandom) => {
  if (pathname.match('comidas')) {
    const newData = await fetchApi(getRandomFood);
    console.log(newData);
    setIdRandom(newData.meals[0].idMeal);
  }
  if (pathname.match('bebidas')) {
    const newData = await fetchApi(getRandomDrink);
    console.log(newData);
    setIdRandom(newData.drinks[0].idDrink);
  }
};

const exploreIngredients = (history, pathname) => (
  <Button
    type="button"
    className="btn btn-secondary"
    data-testid="explore-by-ingredient"
    onClick={ () => history.push(`${pathname}/ingredientes`) }
  >
    Por Ingredientes
  </Button>
);

const exploreOrigin = (history, pathname) => (
  <Button
    type="button"
    className="btn btn-secondary"
    data-testid="explore-by-area"
    onClick={ () => history.push(`${pathname}/area`) }
  >
    Por Local de Origem
  </Button>
);

const exploreSurprise = (history, pathname, idRandom) => {
  const random = pathname.split('/')[2];
  console.log(random);
  return (
    <Button
      type="button"
      className="btn btn-secondary"
      data-testid="explore-surprise"
      onClick={ () => history.push(`/${random}/${idRandom}`) }
    >
      Me Surpreenda!
    </Button>
  );
};

export default function ExploreMoreBtns() {
  const [idRandom, setIdRandom] = useState();
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    fetchRandom(pathname, setIdRandom);
  }, [pathname]);

  return (
    <div>
      {exploreIngredients(history, pathname)}
      {pathname.match('comidas') ? exploreOrigin(history, pathname) : null}
      {exploreSurprise(history, pathname, idRandom)}
    </div>
  );
}
