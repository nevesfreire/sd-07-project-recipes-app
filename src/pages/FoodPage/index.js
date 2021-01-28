import React, { useState } from 'react';
import Header from '../../components/Header/index';
import SearchBarFood from '../../components/SearchBarFood/SearchBarFood';

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

    </div>

  );
}

export default FoodPage;
