import React from 'react';
import PropTypes from 'prop-types';

function CategoryBar({ arrayOfCategories, typeOfCategory }) {
  const magicNumberZero = 0;
  arrayOfCategories.length = 5;

  return (
    <div>
      <button type="button">All</button>
      { arrayOfCategories.length > magicNumberZero
        && arrayOfCategories.map((item) => (
          <button
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
            key={ item.strCategory }
          >
            {item.strCategory}
          </button>
        ))}
    </div>
  );
}

CategoryBar.propTypes = {
  arrayOfCategories: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  typeOfCategory: PropTypes.string.isRequired,
};

export default CategoryBar;
