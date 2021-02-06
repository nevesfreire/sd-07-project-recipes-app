import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestApiMealSurprise } from '../services/requestFood';

function ExplorarComidas() {
  const [mealSurpriseId, setMealSurpriseId] = useState('');

  useEffect(() => {
    const handleSurpriseEndpoint = async () => {
      const endpoint = await requestApiMealSurprise();
      setMealSurpriseId(endpoint[0].idMeal);
    };

    handleSurpriseEndpoint();
  }, []);

  if (!mealSurpriseId) return <span>Loading...</span>;

  return (
    <div>
      <Header name="Explorar Comidas" button={ false } />
      <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient">
        Por Ingredientes
      </Link>
      <Link to="/explorar/comidas/area" data-testid="explore-by-area">
        Por Local de Origem
      </Link>
      <Link
        to={ `/comidas/${mealSurpriseId}` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
