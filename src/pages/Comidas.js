import React from 'react';
import Header from '../Components/Header';
import CardsFood from '../Components/CardsFood';
import Footer from '../Components/Footer';

function Comidas() {
  const isTrue = true;
  return (
    <div>
      <Header text="Comidas" search={ isTrue } />
      <p>AQUI É Comidas</p>
      <CardsFood />
      <Footer />
    </div>
  );
}

export default Comidas;
