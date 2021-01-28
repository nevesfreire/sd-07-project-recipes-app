import React, { useState } from 'react';
import Header from '../../components/Header/index';
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

    </div>
  );
}

export default DrinkPage;
