import React from 'react';

import Header from '../../components/Header/index';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';

function FoodPage() {
  return (
    <div>
      <Header title="Comidas" />
      <Grid page="meals" />
      <Footer />
    </div>
  );
}

export default FoodPage;
