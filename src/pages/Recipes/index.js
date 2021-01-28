import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Recipes({ history, search = false }) {
  const { pathname } = history.location;
  return (
    <>
      <Header history={ history } search={ search } />
      {
        pathname !== '/receitas-feitas'
        && (
          pathname !== '/receitas-favoritas' && <Footer />)
      }
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
