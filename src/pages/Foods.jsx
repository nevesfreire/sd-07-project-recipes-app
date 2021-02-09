import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CardFoods } from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import FoodCategories from '../components/categories/FoodCategories';

const { Container } = FoodsDrinks;

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
    <Container>
      <Header />
      <FoodCategories />
      <CardFoods />
      <Footer />
    </Container>
  );
}
