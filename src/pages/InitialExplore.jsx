import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function InitialExplore() {
  // incluir header
  return (
    <div>
      <Link to="/explorar/comidas">
        <Button
          data-testid="explore-food"
          variant="outline-secondary"
          size="lg"
        >
          Explorar Comidas
        </Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button
          data-testid="explore-drinks"
          variant="outline-secondary"
          size="lg"
        >
          Explorar Bebidas
        </Button>
      </Link>
    </div>
  );
}

export default InitialExplore;
