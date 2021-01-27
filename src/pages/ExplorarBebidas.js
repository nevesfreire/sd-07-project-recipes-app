import React from 'react';
import Header from '../Components/Header';

function ExplorarBebidad() {
  const isFalse = false;
  return (
    <div>
      <Header text="Explorar Bebidas" search={ isFalse } />
      <p>AQUI É O explorar bebidas</p>
    </div>
  );
}

export default ExplorarBebidad;
