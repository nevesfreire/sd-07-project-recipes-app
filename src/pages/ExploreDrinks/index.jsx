import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import './ExploreDrinks.css';
import { fetchRandomDrink } from '../../services/mandaFoods';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const handleFetchingDrink = async () => {
    console.log('xablau blau');
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
    <div className="explore-drink-container">
      <Header title="Explorar Bebidas" />
      <div className="explore-drink-content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <br />
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
