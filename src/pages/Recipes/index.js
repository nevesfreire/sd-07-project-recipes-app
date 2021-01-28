import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

function Recipes({ history, search = false }) {
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
