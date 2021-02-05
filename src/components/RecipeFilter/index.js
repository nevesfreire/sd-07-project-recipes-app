import React from 'react';
import { StyledButtonGroup, StyledToggleButton } from './styles';

const RecipeFilter = () => {
  const FILTERS_OPTIONS = [
    { name: 'All', attribute: 'all' },
    { name: 'Food', attribute: 'food' },
    { name: 'Drinks', attribute: 'drink' },
  ];

  return (
    <StyledButtonGroup toggle>
      {FILTERS_OPTIONS.map(({ name, attribute }) => (
        <StyledToggleButton
          key={ attribute }
          data-testid={ `filter-by-${attribute}-btn` }
          type="checkbox"
          variant="secondary"
          value={ attribute }
          /* checked={ checkedValue === attribute } */
          /* onChange={ (e) => setToggleButton(e.currentTarget.value) } */
        >
          { name }
        </StyledToggleButton>
      ))}
    </StyledButtonGroup>
  );
};

export default RecipeFilter;
