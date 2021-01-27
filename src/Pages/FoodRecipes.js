import React from 'react';
import Header from '../components/Header';
import useFetchFood from '../hooks/useFetchFood';

function FoodRecipes() {
  const { foodFetch } = useFetchFood();
  return (
    <div>
      <Header title="Comidas" explore foodFetch={ foodFetch } />
    </div>
  );
}

export default FoodRecipes;
