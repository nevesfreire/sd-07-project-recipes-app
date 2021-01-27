import React from 'react';
import Header from '../Components/Header';

function ExplorarComidas() {
  const isFalse = false;
  return (
    <div>
      <Header text="Explorar Comidas" search={ isFalse } />
      <p>AQUI É O explorar Comidas</p>
    </div>
  );
}

export default ExplorarComidas;
