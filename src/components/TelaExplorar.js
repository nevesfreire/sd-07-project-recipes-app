import React from 'react';

function TelaExplorar() {
  return (
    <nav>
      <button
        type="button"
        data-testid="explore-food"
      >
        <a
          href="/explorar/comidas"
        >
          Explorar Comidas
        </a>
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
      >
        <a
          href="/explorar/bebidas"
        >
          Explorar Bebidas
        </a>
      </button>
    </nav>
  );
}

export default TelaExplorar;
