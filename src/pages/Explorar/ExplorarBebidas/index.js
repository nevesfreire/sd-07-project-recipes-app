import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ExplorarBebidas() {
  const [id, setId] = useState();

  async function fetchRandom() {
    const result = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    ).then((response) => response.json());
    setId(result.drinks[0].idDrink);
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <br />
      <Link to={ `/bebidas/${id}` } data-testid="explore-surprise">
        Me Surpreenda!
      </Link>
    </div>
  );
}

export default ExplorarBebidas;
