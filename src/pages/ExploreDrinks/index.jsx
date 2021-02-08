import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { fetchRandomDrink } from '../../services/mandaFoods';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const handleFetchingDrink = async () => {
    const result = await fetchRandomDrink();
    if (result) {
      setRandomDrink(result.drinks[0].idDrink);
      console.log(randomDrink);
    }
  };

  useEffect(() => {
    handleFetchingDrink();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/bebidas/${randomDrink}` }
          onClick={ handleFetchingDrink }
        >
          Me Surpreenda!
        </Link>

      </div>
      <Footer />
    </div>
  );
}
