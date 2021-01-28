import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomExplore() {
  return (
    <div>
      <button type="button" data-testid="explore-food">
        <Link to="/explorar/comidas" className="link">Explorar Comidas</Link>
      </button>
      <button type="button" data-testid="explore-drinks">
        <Link to="/explorar/bebidas" className="link">Explorar Bebidas</Link>
      </button>
    </div>
  );
}
