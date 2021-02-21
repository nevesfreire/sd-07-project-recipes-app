import React from 'react';

function HeaderconditionalOne(pathname, title) {
  switch (pathname) {
  case title.explorarComida:
    return (
      <div className="title-header">
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </div>
    );
  case title.explorarBebida:
    return (
      <div className="title-header">
        <h1 data-testid="page-title">Explorar Bebidas</h1>
      </div>
    );
  case title.explorarComidaOrigem:
    return (
      <div className="title-header">
        <h1 data-testid="page-title">Explorar Origem</h1>
      </div>
    );
  default:
    return (
      <h1>No Header</h1>
    );
  }
}

export default HeaderconditionalOne;
