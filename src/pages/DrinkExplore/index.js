import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RequestRandomDrink from '../../services/randomDrink';

const DrinkExplore = () => {
  const [randomId, setRandomId] = useState(false);

  const randomRecipe = useCallback(async () => {
    setRandomId(await RequestRandomDrink());
  }, []);

  if (randomId) return <Redirect to={ `/bebidas/${randomId}` } />;
  return (
    <div>
      <h1>Página de explorar bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <button type="button" data-testid="explore-surprise" onClick={ randomRecipe }>
        Me Surpreenda!
      </button>
    </div>
  );
};

export default DrinkExplore;
