import React from 'react';
import { Button } from '@material-ui/core';
import useRedirect from '../hooks/useRedirect';

function ButtonsForExplorer() {
  const COMIDAS = '/explorar/comidas';
  const BEBIDAS = '/explorar/bebidas';
  const [setPath] = useRedirect();

  return (
    <div className="explore-btn">
      <div className="explore-food">
        <Button
          color="primary"
          variant="contained"
          data-testid="explore-food"
          onClick={ () => setPath(COMIDAS) }
        >
          Explorar Comidas
        </Button>
      </div>
      <div className="explore-drinks">
        <Button
          color="primary"
          variant="contained"
          data-testid="explore-drinks"
          onClick={ () => setPath(BEBIDAS) }
        >
          Explorar Bebidas
        </Button>
      </div>
    </div>
  );
}

export default ButtonsForExplorer;
