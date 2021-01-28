import React from 'react';

import MainDrinks from '../components/MainDrinks';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" isSearchable />
      <MainDrinks />
      <Footer />
    </div>
  );
}
export default Drinks;
