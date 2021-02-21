import React from 'react';
import PropTypes from 'prop-types';
import ButtonsCategoryExplore from './ButtonsCategoryExplore';

function ExploreFoodOrDrink({ pathName }) {
  const { location: { pathname } } = pathName;
  return (
    <ButtonsCategoryExplore path={ pathname } />
  );
}

ExploreFoodOrDrink.propTypes = {
  pathName: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreFoodOrDrink;
