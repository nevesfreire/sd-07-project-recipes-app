import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardsIngredientsDrinks from '../Components/CardsIngredientsDrinks';

function ExplorarBebidasIngredientes() {
  return (
    <div>
      <Header text="Explorar Ingredientes" search={ false } />
      <CardsIngredientsDrinks />
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
