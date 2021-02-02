import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MenuInferior from './Components/MenuInferior';

function Explore({ history }) {
  const { location } = history;
  const { pathname } = location;

  const [randomRecipe, setRandomRecipe] = useState('');

  async function getRandomRecipe() {
    if (pathname.includes('comida')) {
      return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then(({ meals }) => setRandomRecipe(`/comidas/${meals[0].idMeal}`));
    }
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ drinks }) => setRandomRecipe(`/bebidas/${drinks[0].idDrink}`));
  }

  useEffect(() => {
    getRandomRecipe();
  });

  const renderOrigin = () => (
    <Link to="/explorar/comidas/area">
      <Button
        data-testid="explore-by-area"
        variant="outline-secondary"
        size="lg"
      >
        Por Local de Origem
      </Button>
    </Link>
  );

  // incluir header
  // implementar link do botão Me Surpreenda!
  return (
    <div>
      <Link to={ `${pathname}/ingredientes` }>
        <Button
          data-testid="explore-by-ingredient"
          variant="outline-secondary"
          size="lg"
        >
          Por Ingredientes
        </Button>
      </Link>
      { pathname.includes('comidas') && renderOrigin() }
      <Link to={ randomRecipe }>
        <Button
          data-testid="explore-surprise"
          variant="outline-secondary"
          size="lg"
        >
          Me Surpreenda!
        </Button>
      </Link>
    </div>
  );
}

export default Explore;

Explore.propTypes = {
  history: propTypes.objectOf(propTypes.object),
}.isRequired;
