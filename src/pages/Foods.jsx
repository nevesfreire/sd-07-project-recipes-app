import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import FoodCategories from '../components/categories/FoodCategories';

const { Container } = FoodsDrinks;

export default function Foods() {
  const {
    setDataFoods,
    dataFoods,
  } = useContext(GlobalContext);

  const numberOfCards = 12;

  useEffect(() => {
    setDataFoods();
  }, [setDataFoods]);

  return (
    <Container>
      <FoodCategories />
      {Cards(numberOfCards, dataFoods)}
      <Footer />
    </Container>
  );
}
