import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryButtons({ handleClick }) {
  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ ({ target }) => handleClick(target.value) }
        type="button"
        value=""
      >
        All
      </button>
      <button
        data-testid="Beef-category-filter"
        onClick={ ({ target }) => handleClick(target.value) }
        type="button"
        value="Beef"
      >
        Beef
      </button>
      <button
        data-testid="Breakfast-category-filter"
        onClick={ ({ target }) => handleClick(target.value) }
        type="button"
        value="Breakfast"
      >
        Breakfast
      </button>
      <button
        data-testid="Chicken-category-filter"
        onClick={ ({ target }) => handleClick(target.value) }
        type="button"
        value="Chicken"
      >
        Chicken
      </button>
      <button
        data-testid="Dessert-category-filter"
        onClick={ ({ target }) => handleClick(target.value) }
        type="button"
        value="Dessert"
      >
        Dessert
      </button>
      <button
        data-testid="Goat-category-filter"
        onClick={ ({ target }) => handleClick(target.value) }
        type="button"
        value="Goat"
      >
        Goat
      </button>
    </div>
  );
}

CategoryButtons.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
