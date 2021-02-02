import React from 'react';
import Header from '../Components/Header';
import CardsFood from '../Components/CardsFood';
import Footer from '../Components/Footer';
import CategoriesFoods from '../Components/CategoriesFood';

function Comidas() {
  const isTrue = true;
  return (
    <div>
      <Header text="Comidas" search={ isTrue } />
      <CategoriesFoods />
      <CardsFood />
      <Footer />
    </div>
  );
}

export default Comidas;
