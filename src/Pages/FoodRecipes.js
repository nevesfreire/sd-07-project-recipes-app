import React from 'react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

function FoodRecipes() {
  const { foodFetch } = useFetch();
  return (
    <div>
      <Header title="Comidas" explore funcFetch={ foodFetch } />
    </div>
  );
}

export default FoodRecipes;
