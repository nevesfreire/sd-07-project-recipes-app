import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import FoodCategories from '../components/categories/FoodCategories';
import './style/FoodsDrinks.css';

export default function Foods() {
  const {
    setTitle,
    setSearchButton,
    setDataFoods,
    dataFoods,
  } = useContext(GlobalContext);

  const numberOfCards = 12;

  useEffect(() => {
    setTitle('Comidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    setDataFoods();
  }, [setDataFoods]);

  return (
    <div className="foods-drinks-container">
      <Header />
      <FoodCategories />
      {Cards(numberOfCards, dataFoods)}
      <Footer />
    </div>
  );
}
