import React from 'react';
import Header from '../Components/Header';
import CardsDrinks from '../Components/CardsDrinks';

function Bebidas() {
  const isTruth = true;
  return (
    <div>
      <Header text="Bebidas" search={ isTruth } />
      <p>AQUI É Bebidas</p>
      <CardsDrinks />
    </div>
  );
}

export default Bebidas;
