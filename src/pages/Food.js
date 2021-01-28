import React from 'react';

import Header from '../components/Header';
import MainMeals from '../components/MainMeals';

function Food() {
  return (
    <div>
      <Header title="Comidas" isSearchable />
      <MainMeals />
    </div>
  );
}
export default Food;
