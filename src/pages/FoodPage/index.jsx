import React, { useState } from 'react';
import Header from '../../components/Header/index';
import SearchBarFood from '../../components/SearchBarFood/SearchBarFood';
// import Grid from '../../components/Grid';
import Footer from '../../components/Footer';

function FoodPage() {
  const [data, setData] = useState('');
  function setValueSearch(value) {
    setData(value);
  }
  return (
    <div>
      <Header
        title="Comidas"
        onSearchChange={ setValueSearch }
      />
      <SearchBarFood
        searchValue={ data }
      />
      {/* <Grid page="meals" /> */}
      <Footer />
    </div>
  );
}

export default FoodPage;
