import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CardFoods } from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import FoodCategories from '../components/categories/FoodCategories';
import './style/foodsDrinks.css';

export default function Foods() {
  const {
    setTitle,
    setSearchButton,
    selectedTypeFood,
    searchByIngredient,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Comidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    selectedTypeFood(searchByIngredient === '' ? 'initial' : 'ingredientsExplorer');
  }, [selectedTypeFood]);

  return (
    <div className="foods-drinks-container">
      <Header />
      <FoodCategories />
      <CardFoods />
      <Footer />
    </div>
  );
}
