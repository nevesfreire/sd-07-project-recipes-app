import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explorar Comidas" isSearchable={ false } />
      <Footer />
    </div>
  );
}
export default ExploreFoods;
