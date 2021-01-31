import React from 'react';
import { Link } from 'react-router-dom';

const Explorar = () => (
  <div>
    <div>
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        <span>Explore Food</span>
      </Link>
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        <span>Explore Drinks</span>
      </Link>
    </div>
  </div>
);

export default Explorar;
