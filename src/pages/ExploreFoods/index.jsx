import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
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
    <div>
      <Header title="Explorar Comidas" />
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
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
