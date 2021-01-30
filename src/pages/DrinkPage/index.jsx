import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';
import SearchBarByDrinks from '../../components/SearchBarDrinks/SearchBarByDrinks';

function DrinkPage() {
  const [data, setData] = useState('');
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  function setValueSearch(value) {
    setData(value);
  }
  return (
    <div>
      <Header
        title="Bebidas"
        onSearchChange={ setValueSearch }
        setIsSearchBarActive={ setIsSearchBarActive }
      />
      <SearchBarByDrinks
        searchValue={ data }
      />
      {
        !isSearchBarActive && <Grid page="drinks" />
      }
      <Footer />

    </div>
  );
}

export default DrinkPage;
