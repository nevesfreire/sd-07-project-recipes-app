import React from 'react';

function HeaderconditionalThree(pathname, title) {
  switch (pathname) {
  case title.explorarComidaIngredientes:
    return (
      <h1
        className="title-header-food"
        data-testid="page-title"
      >
        Explorar Ingredientes
      </h1>
    );
  case title.explorarBebidaIngredientes:
    return (
      <h1
        className="title-header-drink"
        data-testid="page-title"
      >
        Explorar Ingredientes
      </h1>
    );
  default:
    return (
      <h1>No Header</h1>
    );
  }
}

export default HeaderconditionalThree;
