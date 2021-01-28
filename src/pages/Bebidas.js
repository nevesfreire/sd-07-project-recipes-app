import React from 'react';
import Header from '../Components/Header';
import CardsDrinks from '../Components/CardsDrinks';
import Footer from '../Components/Footer';

function Bebidas() {
  const isTruth = true;
  return (
    <div>
      <Header text="Bebidas" search={ isTruth } />
      <p>AQUI É Bebidas</p>
      <CardsDrinks />
      <Footer />
    </div>
  );
}

export default Bebidas;
