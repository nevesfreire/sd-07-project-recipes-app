import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CardDrinks } from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import DrinkCategories from '../components/categories/DrinkCategories';

const { Container } = FoodsDrinks;

export default function Drinks() {
  const {
    setTitle,
    setSearchButton,
    selectedTypeDrink,
    searchByIngredient,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Bebidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    selectedTypeDrink(searchByIngredient === '' ? 'initial' : 'ingredientsExplorer');
  }, [selectedTypeDrink]);

  return (
    <Container>
      <Header />
      <DrinkCategories />
      <CardDrinks />
      <Footer />
    </Container>
  );
}
