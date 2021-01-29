import React from 'react';

import Header from '../../components/Header/index';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';

function DrinkPage() {
  return (
    <div>
      <Header title="Bebidas" />
      <Grid page="drinks" />
      <Footer />
    </div>
  );
}

export default DrinkPage;
