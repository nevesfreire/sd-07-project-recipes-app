import React from 'react';

import MainDrinks from '../components/MainDrinks';
import Header from '../components/Header';

function Drinks() {
  return (
    <section>
      <Header title="Bebidas" isSearchable />
      <MainDrinks />
    </section>
  );
}
export default Drinks;
