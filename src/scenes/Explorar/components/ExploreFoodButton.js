import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function ExploreFoodButton() {
  return (
    <div>
      <Link to="/explorar/comidas">
        <Button
          data-testid="explore-food"
          placeholder="Explorar Comidas"
        >
          Explorar Comidas

        </Button>
      </Link>
    </div>
  );
}
