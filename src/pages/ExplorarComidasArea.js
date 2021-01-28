import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExplorarComidasArea() {
  const isTrue = true;
  return (
    <div>
      <Header text="Explorar Origem" search={ isTrue } />
      <p>AQUI É Explorar por área</p>
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
