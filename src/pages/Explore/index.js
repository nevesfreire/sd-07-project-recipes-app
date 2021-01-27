import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

function Explore({ history, search = false }) {
  return (
    <>
      <Header history={ history } search={ search } />
      <p>Explore</p>
    </>
  );
}

Explore.defaultProps = { search: false };

Explore.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Explore;
