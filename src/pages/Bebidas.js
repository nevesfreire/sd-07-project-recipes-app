import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import { fetchGlobalDrink } from '../services/API';

function Bebidas() {
  const [globalDrink, setGlobalDrink] = useState([]);

  const getGlobalDrinkData = async () => {
    const data = await fetchGlobalDrink();
    setGlobalDrink(data);
  };

  useEffect(() => {
    getGlobalDrinkData();
  }, []);

  return (
    <div>
      <Header title="Bebidas" hideSearchIcon="false" />
      <CardList arrayOfCard={ globalDrink } typeOfCard="Drink" />
      <Footer />
    </div>
  );
}

export default Bebidas;
