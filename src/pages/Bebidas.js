import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import CategoryBar from '../components/CategoryBar';
import { fetchGlobalDrink, fetchDrinkCategory } from '../services/API';

function Bebidas() {
  const [globalDrink, setGlobalDrink] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const getGlobalDrinkData = async () => {
    const data = await fetchGlobalDrink();
    setGlobalDrink(data);
  };

  const getCategoriesDrinkData = async () => {
    const data = await fetchDrinkCategory();
    setDrinkCategories(data);
  };

  useEffect(() => {
    getGlobalDrinkData();
    getCategoriesDrinkData();
  }, []);

  return (
    <div>
      <Header title="Bebidas" hideSearchIcon="false" />
      <CategoryBar arrayOfCategories={ drinkCategories } typeOfCategory="Drink" />
      <CardList arrayOfCard={ globalDrink } typeOfCard="Drink" />
      <Footer />
    </div>
  );
}

export default Bebidas;
