import React from 'react';
import Header from '../components/Header';
import useFetchDrink from '../hooks/useFetchDrink';

function DrinksRecipes() {
  const { drinkFetch } = useFetchDrink();
  console.log(drinkFetch);
  return (
    <div>
      <Header title="Bebidas" explore drinkFetch={ () => drinkFetch } />
    </div>
  );
}

export default DrinksRecipes;
