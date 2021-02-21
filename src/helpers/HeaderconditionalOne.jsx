import React from 'react';

function HeaderconditionalOne(pathname, title) {
  switch (pathname) {
  case title.comidas:
    return (
      <h1 className="title-header" data-testid="page-title">Comidas</h1>
    );
  case title.bebidas:
    return (
      <h1 className="title-header" data-testid="page-title">Bebidas</h1>
    );

  case title.explorar:
    return (
      <h1 className="title-header" data-testid="page-title">Explorar</h1>
    );

  case title.perfil:
    return (
      <h1 className="title-header" data-testid="page-title">Perfil</h1>
    );
  default:
    return (
      <h1>No Header</h1>
    );
  }
}

export default HeaderconditionalOne;
