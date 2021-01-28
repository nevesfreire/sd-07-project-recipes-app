<<<<<<< HEAD:src/pages/FoodPage/index.js
import React, { useState } from 'react';
import Header from '../../components/Header/index';
import SearchBarFood from '../../components/SearchBarFood/SearchBarFood';
=======
import React from 'react';

import Header from '../../components/Header/index';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';
>>>>>>> main-group-31:src/pages/FoodPage/index.jsx

function FoodPage() {
  const [data, setData] = useState('');
  function setValueSearch(value) {
    setData(value);
  }
  return (
    <div>
<<<<<<< HEAD:src/pages/FoodPage/index.js
      <Header
        title="Comidas"
        onSearchChange={ setValueSearch }
      />
      <SearchBarFood
        searchValue={ data }
      />

=======
      <Header title="Comidas" />
      <Grid />
      <Footer />
>>>>>>> main-group-31:src/pages/FoodPage/index.jsx
    </div>
  );
}

export default FoodPage;
