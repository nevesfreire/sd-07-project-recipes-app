import React from 'react';
import { Link } from 'react-router-dom';

function Feed() {
  return (
    <main>
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <br />
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
    </main>
  );
}

export default Feed;
