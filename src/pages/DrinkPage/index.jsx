import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';
import SearchBarByDrinks from '../../components/SearchBarDrinks/SearchBarByDrinks';

function DrinkPage() {
  const [data, setData] = useState('');
  function setValueSearch(value) {
    setData(value);
  }
  return (
    <div>
      <Header
        title="Bebidas"
        onSearchChange={ setValueSearch }
      />
      <SearchBarByDrinks
        searchValue={ data }
      />
      <Grid page="drinks" />
      <Footer />

    </div>
  );
}

export default DrinkPage;
