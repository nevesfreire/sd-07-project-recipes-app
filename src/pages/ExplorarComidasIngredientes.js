import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardsIngredientsFoods from '../Components/CardsIngredientsFoods';

function ExplorarComidasIngredientes() {
  return (
    <div>
      <Header text="Explorar Ingredientes" search={ false } />
      <CardsIngredientsFoods />
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;
