import React from 'react';
import PropTypes from 'prop-types';
import {
  CategoryFood,
  CardsFoodFiltred,
} from './CardsAndCategorys';

export default function FoodCards({ category, number }) {
  return (
    <div>
      <CategoryFood />
      <CardsFoodFiltred
        category={ category }
        number={ number }
      />
    </div>

  );
}

FoodCards.defaultProps = {
  number: 12,
};

FoodCards.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number,
};
