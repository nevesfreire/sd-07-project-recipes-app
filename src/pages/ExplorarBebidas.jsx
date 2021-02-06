import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestApiDrinkSurprise } from '../services/requestDrink';

function ExplorarBebidas() {
  const [drinkSurpriseId, setDrinkSurpriseId] = useState('');

  useEffect(() => {
    const handleSurpriseEndpoint = async () => {
      const endpoint = await requestApiDrinkSurprise();
      setDrinkSurpriseId(endpoint[0].idDrink);
    };

    handleSurpriseEndpoint();
  }, []);

  if (!drinkSurpriseId) return <span>Loading...</span>;

  return (
    <div>
      <Header name="Explorar Bebidas" button={ false } />
      <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient">
        Por Ingredientes
      </Link>
      <Link
        to={ `/bebidas/${drinkSurpriseId}` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
