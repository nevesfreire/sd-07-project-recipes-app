import React from 'react';
import PropTypes from 'prop-types';

export default function Category({ category }) {
  return (
    <button
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
    >
      { category.strCategory }
    </button>
  );
}

Category.propTypes = {
  category: PropTypes.shape().isRequired,
};
