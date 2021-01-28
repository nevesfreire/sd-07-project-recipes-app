import React from 'react';
import Header from '../Components/Header';
import CardsDrinks from '../Components/CardsDrinks';
import Footer from '../Components/Footer';
import CategoriesDrinks from '../Components/CategoriesDrinks';

function Bebidas() {
  const isTruth = true;
  return (
    <div>
      <Header text="Bebidas" search={ isTruth } />
      <CategoriesDrinks />
      <CardsDrinks />
      <Footer />
    </div>
  );
}

export default Bebidas;
