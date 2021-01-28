import React from 'react';

import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';

export default function Comidas() {
  return (
    <div>
      <SearchBar foodType="comidas" />
      <Footer />
    </div>
  );
}
