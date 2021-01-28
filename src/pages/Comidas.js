import React from 'react';
import Header from '../Components/Header';
import CardsFood from '../Components/CardsFood';

function Comidas() {
  const isTrue = true;
  return (
    <div>
      <Header text="Comidas" search={ isTrue } />
      <p>AQUI É Comidas</p>
      <CardsFood />
    </div>
  );
}

export default Comidas;
