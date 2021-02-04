import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchDrink } from '../../../services/API';

export default function ExplorarBebidas() {
  const [randomId, setRandomId] = useState();

  const fetchRandom = async () => {
    const randomRecipe = await fetchDrink('');
    setRandomId(randomRecipe.drinks[0].idDrink);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <Button data-testid="explore-by-ingredient">Por Ingredientes</Button>
      </Link>
      <Link to={ `/bebidas/${randomId}` }>
        <Button data-testid="explore-surprise">Me Surpreenda!</Button>
      </Link>
    </div>
  );
}
