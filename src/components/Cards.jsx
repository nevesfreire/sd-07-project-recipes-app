import React from 'react';
import PropTypes from 'prop-types';
import {
  CategoryDrink,
  CategoryFood,
  CardsDrinkFiltred,
  CardsFoodFiltred,
} from './CardsAndCategorys';

export default function Cards({ category, number, food }) {
  return (
    food
      ? (
        <div>
          <CategoryFood />
          <CardsFoodFiltred
            category={ category }
            number={ number }
          />
        </div>
      )
      : (
        <div>
          <CategoryDrink />
          <CardsDrinkFiltred
            category={ category }
            number={ number }
          />
        </div>
      )
  );
}

Cards.defaultProps = {
  number: 12,
  food: true,
};

Cards.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number,
  food: PropTypes.bool,
};
