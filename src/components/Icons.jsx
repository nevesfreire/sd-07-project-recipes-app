import React from 'react';
import DrinkBtn from './DrinkBtn';
import FoodBtn from './FoodBtn';
import ExploreBtn from './ExploreBtn';

function Icons() {
  return (
    <div className="main-icons">
      <FoodBtn />
      <ExploreBtn />
      <DrinkBtn />
    </div>
  );
}

export default Icons;
