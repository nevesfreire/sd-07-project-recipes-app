import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardList from '../components/CardList';
import { fetchGlobalFood } from '../services/API';

function Comidas() {
  const [globalFood, setGlobalFood] = useState([]);

  const getGlobalFoodData = async () => {
    const data = await fetchGlobalFood();
    setGlobalFood(data);
  };

  useEffect(() => {
    getGlobalFoodData();
  }, []);

  return (
    <div>
      <Header title="Comidas" hideSearchIcon="false" />
      <CardList arrayOfCard={ globalFood } typeOfCard="Meal" />
      <Footer />
    </div>
  );
}

export default Comidas;
