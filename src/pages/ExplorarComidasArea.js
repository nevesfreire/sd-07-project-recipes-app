import React from 'react';
import Header from '../Components/Header';

function ExplorarComidasArea() {
  const isTrue = true;
  return (
    <div>
      <Header text="Explorar Origem" search={ isTrue } />
      <p>AQUI É Explorar por área</p>
    </div>
  );
}

export default ExplorarComidasArea;
