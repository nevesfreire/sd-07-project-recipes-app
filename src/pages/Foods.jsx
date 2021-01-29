import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import FoodCategories from '../components/categories/FoodCategories';

const { Container } = FoodsDrinks;

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
    <Container>
      <Header />
      <FoodCategories />
      {Cards(numberOfCards, dataFoods)}
      <Footer />
    </Container>
  );
}
