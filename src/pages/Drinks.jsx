import React, { useContext, useEffect, useCallback } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import DrinkCategories from '../components/categories/DrinkCategories';

const { Container } = FoodsDrinks;
export default function Drinks() {
  const {
    setDataDrinks,
    dataDrinks,
  } = useContext(GlobalContext);

  const numberOfCards = 12;

  const fetchDrinkList = useCallback(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then(({ drinks }) => {
        const filter = () => {
          const filteredResponse = [];
          if (drinks !== null) {
            Object.entries(drinks).forEach((drink, index) => {
              if (index < numberOfCards) {
                const { strDrink, strDrinkThumb } = drink[1];
                filteredResponse.push({ name: strDrink, image: strDrinkThumb });
              }
            });
          }
          return filteredResponse;
        };
        setDataDrinks(filter());
      }, []);
  }, [setDataDrinks]);

  useEffect(() => {
    fetchDrinkList();
  }, [fetchDrinkList]);

  return (
    <Container>
      <DrinkCategories />
      {Cards(numberOfCards, dataDrinks)}
      <Footer />
    </Container>
  );
}
