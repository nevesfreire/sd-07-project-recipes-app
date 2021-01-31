import React from 'react';

import { Header, MainRecipes, Category, Footer } from '../components/index';
import '../styles/recipes.css';

function Food() {
  return (
    <div>
      <Header title="Comidas" isSearchable />
      <Category />
      <MainRecipes />
      <Footer />
    </div>
  );
}
export default Food;
