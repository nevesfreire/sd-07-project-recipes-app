import React from 'react';
import PropTypes from 'prop-types';
import {
  CategoryDrink,
  CardsDrinkFiltred,
} from './CardsAndCategorys';

export default function Cards({ category, number }) {
  return (
    <div>
      <CategoryDrink />
      <CardsDrinkFiltred
        category={ category }
        number={ number }
      />
    </div>
  );
}

Cards.defaultProps = {
  number: 12,
};

Cards.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number,
};
