import React from 'react';

import Header from '../components/Header';
import MainMeals from '../components/MainMeals';
import Footer from '../components/Footer';

function Food({ ...props }) {
  return (
    <div>
      <Header title="Comidas" isSearchable props={ props } />
      <MainMeals />
      <Footer />
    </div>
  );
}
export default Food;
