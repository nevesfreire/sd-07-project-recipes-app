import React from 'react';
import ExplorarIngredientes from '../../components/ExplorarIngredientes';
import Footer from '../../components/footer/Footer';
import Header2 from '../../components/header/Header2';

function BebidasIngredientes() {
  return (
    <div>
      <Header2 title="Explorar Ingredientes" />
      <ExplorarIngredientes />
      <Footer />
    </div>
  );
}
export default BebidasIngredientes;
