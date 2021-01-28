import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context/Provider';
import Header from '../../components/Header';

function Recipes({ history, search = false }) {
  const { setApi } = useContext(Context);

  useEffect(() => {
    if (history.location.pathname.includes('bebidas')) setApi('drinks');
    else setApi('meal');
  }, [history.location.pathname, setApi]);

  return (
    <>
      <Header history={ history } search={ search } />
      <p>Recipes</p>
    </>
  );
}

Recipes.defaultProps = { search: false };

Recipes.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipes;
