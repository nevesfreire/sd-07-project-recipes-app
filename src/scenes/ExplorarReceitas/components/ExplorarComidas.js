import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchMeal } from '../../../services/API';

export default function ExplorarComidas() {
  const [randomId, setRandomId] = useState();

  const fetchRandom = async () => {
    const randomRecipe = await fetchMeal('');
    setRandomId(randomRecipe.meals[0].idMeal);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <Button data-testid="explore-by-ingredient">Por Ingredientes</Button>
      </Link>
      <Link to="/explorar/comidas/area">
        <Button data-testid="explore-by-area">Por Local de Origem</Button>
      </Link>
      <Link to={ `/comidas/${randomId}` }>
        <Button data-testid="explore-surprise">Me Surpreenda!</Button>
      </Link>
    </div>
  );
}
