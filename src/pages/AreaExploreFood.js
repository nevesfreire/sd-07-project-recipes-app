import React, { useContext } from 'react';
import { CupNodesContext } from '../contexts';
import {
  Header, Footer, AreaFilterDropdown, AreaCards, FoodRecomendationsCards,
} from '../components';

export default function OriginFoodExplore() {
  const { filterDates: { area } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Explorar Origem" />
      <AreaFilterDropdown number={ undefined } />
      {
        area
          ? <AreaCards area={ area } />
          : <FoodRecomendationsCards number={ undefined } />
      }
      <Footer />
    </div>

  );
}
