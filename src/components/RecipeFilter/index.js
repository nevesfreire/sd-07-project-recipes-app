import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/ducks/recipes';
import { StyledButtonGroup, StyledToggleButton } from './styles';

const RecipeFilter = () => {
  const dispatch = useDispatch();
  const [checkedValue, setCheckedValue] = useState('all');

  const handleClick = ({ target: { value } }) => {
    if (value && value !== checkedValue) {
      setCheckedValue(value);
    }
  };

  useEffect(() => {
    dispatch(setFilter('doneAndFav', 'foodOrDrink', checkedValue));
  }, [dispatch, checkedValue]);

  const FILTERS_OPTIONS = [
    { name: 'All', attribute: 'all', dataTestId: 'all' },
    { name: 'Food', attribute: 'bebida', dataTestId: 'food' },
    { name: 'Drinks', attribute: 'comida', dataTestId: 'drink' },
  ];

  return (
    <StyledButtonGroup toggle>
      {FILTERS_OPTIONS.map(({ name, attribute, dataTestId }) => (
        <StyledToggleButton
          key={ attribute }
          data-testid={ `filter-by-${dataTestId}-btn` }
          type="checkbox"
          variant="secondary"
          value={ attribute }
          onClick={ handleClick }
          checked={ checkedValue === attribute }
        >
          { name }
        </StyledToggleButton>
      ))}
    </StyledButtonGroup>
  );
};

export default RecipeFilter;
