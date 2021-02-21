import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import useRedirect from '../hooks/useRedirect';

function ButtonsCategoryExplore({ path }) {
  const PATHITEMIGREDIENTS = `${path}/ingredientes`;
  const PATHITEMAREA = `${path}/area`;
  const BEVERAGE_EXPLORE = '/explorar/bebidas';

  const [setPath] = useRedirect();
  return (
    <div className="explore-container">
      <div className="explore-by-ingredient">
        <Button
          color="primary"
          variant="contained"
          data-testid="explore-by-ingredient"
          onClick={ () => setPath(PATHITEMIGREDIENTS) }
        >
          Por Ingredientes
        </Button>

      </div>

      {
        path === BEVERAGE_EXPLORE ? null : (
          <div className="explore-by-area">
            <Button
              className="explore-by-area"
              color="primary"
              variant="contained"
              data-testid="explore-by-area"
              onClick={ () => setPath(PATHITEMAREA) }
            >
              Por Local de Origem
            </Button>
          </div>
        )
      }

      <div className="explore-surprise">
        <Button
          color="primary"
          variant="contained"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </Button>
      </div>
    </div>
  );
}

ButtonsCategoryExplore.propTypes = {
  path: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ButtonsCategoryExplore;
