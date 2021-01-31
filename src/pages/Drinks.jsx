import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import './style/FoodsDrinks.css';
import DrinkCategories from '../components/categories/DrinkCategories';

export default function Drinks() {
  const {
    setTitle,
    setSearchButton,
    setDataDrinks,
    dataDrinks,
  } = useContext(GlobalContext);

  const numberOfCards = 12;

  useEffect(() => {
    setTitle('Bebidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    setDataDrinks();
  }, [setDataDrinks]);

  return (
    <section className="foods-drinks-container">
      <Header />
      <DrinkCategories />
      {Cards(numberOfCards, dataDrinks)}
      <Footer />
    </section>
  );
}
