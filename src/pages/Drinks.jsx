import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
<<<<<<< HEAD
import DrinkCategories from '../components/categories/DrinkCategories';
import './style/FoodsDrinks.css';
=======
import './style/FoodsDrinks.css';
import DrinkCategories from '../components/categories/DrinkCategories';
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622

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
<<<<<<< HEAD
    <div className="foods-drinks-container">
=======
    <section className="foods-drinks-container">
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
      <Header />
      <DrinkCategories />
      {Cards(numberOfCards, dataDrinks)}
      <Footer />
<<<<<<< HEAD
    </div>
=======
    </section>
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
  );
}
