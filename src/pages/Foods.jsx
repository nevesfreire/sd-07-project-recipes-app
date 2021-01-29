import React, { useContext, useEffect, useCallback } from 'react';
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

  const fetchFoodList = useCallback(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then(({ meals }) => {
        const filter = () => {
          const filteredResponse = [];
          if (meals !== null) {
            Object.entries(meals).forEach((meal, index) => {
              if (index < numberOfCards) {
                const { strMeal, strMealThumb } = meal[1];
                filteredResponse.push({ name: strMeal, image: strMealThumb });
              }
            });
          }
          return filteredResponse;
        };
        setDataFoods(filter());
      }, []);
  }, [setDataFoods]);

  useEffect(() => {
    fetchFoodList();
  }, [fetchFoodList]);

  return (
    <Container>
      <FoodCategories />
      {Cards(numberOfCards, dataFoods)}
      <Footer />
    </Container>
  );
}
