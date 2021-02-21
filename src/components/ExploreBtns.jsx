import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const exploreDrinks = (history) => (
  <Button
    type="button"
    variant="contained"
    data-testid="explore-drinks"
    onClick={ () => history.push('/explorar/bebidas') }
  >
    Explorar Bebidas
  </Button>
);

const exploreFood = (history) => (
  <Button
    type="button"
    variant="contained"
    data-testid="explore-food"
    onClick={ () => history.push('/explorar/comidas') }
  >
    Explorar Comidas
  </Button>
);

export default function ExploreBtns() {
  const history = useHistory();
  return (
    <div>
      {exploreDrinks(history)}
      {exploreFood(history)}
    </div>
  );
}
