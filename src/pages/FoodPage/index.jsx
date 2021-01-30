import React, { useState } from 'react';
import Header from '../../components/Header/index';
import SearchBarFood from '../../components/SearchBarFood/SearchBarFood';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';

function FoodPage() {
  const [data, setData] = useState('');
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  function setValueSearch(value) {
    setData(value);
  }
  return (
    <div>
      <Header
        title="Comidas"
        onSearchChange={ setValueSearch }
        setIsSearchBarActive={ setIsSearchBarActive }
      />
      <SearchBarFood
        searchValue={ data }
      />
      {
        !isSearchBarActive && <Grid page="meals" />
      }
      <Footer />
    </div>
  );
}

export default FoodPage;
