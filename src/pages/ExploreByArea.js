import React from 'react';

import { Header, Footer, ExploreArea } from '../components';
import '../styles/areaExplore.css';

function ExploreByArea() {
  return (
    <div>
      <Header title="Explorar Origem" isSearchable />
      <ExploreArea />
      <Footer />
    </div>
  );
}

export default ExploreByArea;
