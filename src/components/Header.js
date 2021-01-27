import React from 'react';

function Header() {
  return (
    <header>
      <h1 data-testid="page-title">Receitas de Comida</h1>
      <button type="button" data-testid="profile-top-btn">Perfil</button>
      <button type="button" data-testid="search-top-btn">Buscar</button>
    </header>
  );
}

export default Header;
