import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CardDrinks } from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import DrinkCategories from '../components/categories/DrinkCategories';
import './style/foodsDrinks.css';

export default function Drinks() {
  const {
    setTitle,
    setSearchButton,
    selectedTypeDrink,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Bebidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    selectedTypeDrink('initial');
  }, [selectedTypeDrink]);

  return (
    <div className="foods-drinks-container">
      <Header />
      <DrinkCategories />
      <CardDrinks />
      <Footer />
    </div>
  );
}
