import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ExplorerButtons() {
  const [render, setRender] = useState();
  const path = useHistory().location.pathname;
  const urlFoods = '/explorar/comidas';

  useEffect(() => {
    if (path === urlFoods) {
      setRender(true);
    } else {
      setRender(false);
    }
  }, []);

  return (
    <div>
      <Link to={ path === urlFoods ? `${path}/ingredientes` : `${path}/ingredientes` }>
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      {render ? (
        <Link to={ `${path}/area` }>
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
      ) : (
        <span />
      )}
      <Link to={ path === urlFoods ? 'comidas/:{id}' : 'bebidas/:{id}' }>
        <button
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default ExplorerButtons;
