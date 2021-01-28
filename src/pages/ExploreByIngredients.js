import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreByIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" isSearchable={ false } />
      <Footer />
    </div>
  );
}
export default ExploreByIngredients;
