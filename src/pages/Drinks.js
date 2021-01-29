import React from 'react';

import MainDrinks from '../components/MainDrinks';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks({ ...props }) {
  return (
    <div>
      <Header title="Bebidas" isSearchable props={ props } />
      <MainDrinks />
      <Footer />
    </div>
  );
}
export default Drinks;
