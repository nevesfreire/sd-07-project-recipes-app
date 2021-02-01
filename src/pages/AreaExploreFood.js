import React, { useContext } from 'react';
import { CupNodesContext } from '../contexts';
import {
  Header, Footer, AreaFilterDropdown, CardsFactory,
} from '../components';

export default function OriginFoodExplore() {
  const { filterDates: { area } } = useContext(CupNodesContext);
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const allURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return (
    <div>
      <Header title="Explorar Origem" />
      <AreaFilterDropdown number={ undefined } />
      {
        area
          ? <CardsFactory URL={ URL } drink={ false } />
          : <CardsFactory URL={ allURL } drink={ false } />
      }
      <Footer />
    </div>

  );
}
