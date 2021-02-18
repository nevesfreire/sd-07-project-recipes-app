import React from 'react';

function Header() {
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src="" alt="usuario" />
      </button>
      <h1 data-testid="page-title"> Comidas/Bebidas </h1>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src="" alt="buscar" />
      </button>
    </div>
  );
}

export default Header;
