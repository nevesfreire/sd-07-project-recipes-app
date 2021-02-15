import React, { useContext } from 'react';
import { CupNodesContext } from '../contexts';
import {
  Header, Footer, AreaFilterDropdown, CardsFactory,
} from '../components';
import { getURL } from '../Services';

export default function OriginFoodExplore() {
  const { filterDates: { area } } = useContext(CupNodesContext);
  const URL = getURL({ area }, false);
  return (
    <div>
      <Header title="Explorar Origem" />
      <AreaFilterDropdown number={ undefined } />
      <CardsFactory URL={ URL } drink={ false } />
      <Footer />
    </div>

  );
}
