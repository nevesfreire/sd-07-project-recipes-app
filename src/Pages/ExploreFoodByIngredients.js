/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';

function ExploreFoodByIngredients() {
  const [firstTwelveIngredients, setFirstTwelveIngredients] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const twelve = 12;
  const zero = 0;
  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredients = await response.json();
      setFirstTwelveIngredients(ingredients.meals.slice(zero, twelve));
      setIsFetching(false);
    };
    fetchIngredients();
  }, [firstTwelveIngredients]);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {!isFetching && (
        firstTwelveIngredients.map((ingredient, index) => (
          <Card
            item={ ingredient }
            key={ index }
            index={ index }
            isFoodIngredient
          />
        ))
      )}
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
