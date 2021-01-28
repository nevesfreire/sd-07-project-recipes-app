import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExplorarComidasIngredientes() {
  return (
    <div>
      <Header text="Explorar Ingredientes" search={ false } />
      <p>AQUI É Explorar comidas por Ingredientes</p>
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;
