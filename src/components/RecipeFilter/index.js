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
    /* return () => {
      dispatch(setFilter('')); // cleanup filter
    }; */
  },
  [dispatch, checkedValue]);

  useEffect(() => () => {
    dispatch(setFilter('doneAndFav', '')); // cleanup filter
  },
  [dispatch]);

  const FILTERS_OPTIONS = [
    { name: 'All', attribute: 'all' },
    { name: 'Food', attribute: 'comida' },
    { name: 'Drinks', attribute: 'bebida' },
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
