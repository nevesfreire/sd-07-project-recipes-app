import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ExplorerButtons() {
  const [render, setRender] = useState();
  const path = useHistory().location.pathname;

  useEffect(() => {
    if (path === '/explorar/comidas') {
      setRender(true);
    } else {
      setRender(false);
    }
  }, []);

  return (
    <div>
      <Link to={ `${path}/ingredientes` }>
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      {render ? (
        <Link to={ `${path}/area` }>
          <button data-testid="explore-by-area" type="button">Por Local de Origem</button>
        </Link>
      ) : (
        <span />
      )}
      <Link to={ `${path}/:{id-da-receita}` }>
        <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
      </Link>
    </div>
  );
}

export default ExplorerButtons;
