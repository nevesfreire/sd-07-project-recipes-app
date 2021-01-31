import React from 'react';

import { Header, MainRecipes, Category, Footer } from '../components/index';
import '../styles/recipes.css';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" isSearchable />
      <Category />
      <MainRecipes />
      <Footer />
    </div>
  );
}
export default Drinks;
