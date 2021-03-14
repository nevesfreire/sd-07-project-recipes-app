import React from 'react';
import { useHistory } from 'react-router-dom';

const exploreDrinks = (history) => (
  <button
    type="button"
    className="btn btn-secondary"
    data-testid="explore-drinks"
    onClick={ () => history.push('/explorar/bebidas') }
  >
    Explorar Bebidas
  </button>
);

const exploreFood = (history) => (
  <button
    type="button"
    className="btn btn-secondary"
    data-testid="explore-food"
    onClick={ () => history.push('/explorar/comidas') }
  >
    Explorar Comidas
  </button>
);

function ExploreBtns() {
  const history = useHistory();
  return (
    <div>
      {exploreDrinks(history)}
      {exploreFood(history)}
    </div>
  );
}

export default ExploreBtns;
