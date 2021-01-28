import React from 'react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

function DrinksRecipes() {
  const { drinkFetch } = useFetch();
  return (
    <div>
      <Header title="Bebidas" explore funcFetch={ drinkFetch } />
    </div>
  );
}

export default DrinksRecipes;
