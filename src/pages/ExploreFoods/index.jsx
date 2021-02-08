import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import './ExploreFoods.css';
import { fetchRandomFood } from '../../services/mandaFoods';

export default function ExploreFoods() {
  const [randomFood, setRandomFood] = useState();
  const handleFetchingFood = async () => {
    console.log('xablau blau');
    const result = await fetchRandomFood();
    if (result) {
      setRandomFood(result.meals[0].idMeal);
      console.log(randomFood);
    }
  };

  useEffect(() => {
    handleFetchingFood();
  }, []);

  return (
    <div className="explore-food-container">
      <Header title="Explorar Comidas" />
      <div className="explore-food-content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <br />
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <br />
        <Link
          data-testid="explore-surprise"
          to={ `/comidas/${randomFood}` }
          onClick={ handleFetchingFood }
        >
          Me Surpreenda!
        </Link>

      </div>
      <Footer />
    </div>
  );
}
