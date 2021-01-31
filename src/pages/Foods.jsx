import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
<<<<<<< HEAD
import FoodCategories from '../components/categories/FoodCategories';
import './style/FoodsDrinks.css';
=======
import './style/FoodsDrinks.css';
import FoodCategories from '../components/categories/FoodCategories';
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622

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
<<<<<<< HEAD
    <div className="foods-drinks-container">
=======
    <section className="foods-drinks-container">
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
      <Header />
      <FoodCategories />
      {Cards(numberOfCards, dataFoods)}
      <Footer />
<<<<<<< HEAD
    </div>
=======
    </section>
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
  );
}
