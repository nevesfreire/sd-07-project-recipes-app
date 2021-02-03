import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCategories, setFilter } from '../../store/ducks/recipes';
import { FILTER_TYPES } from '../../services/recipeAPI';
import { StyledButtonGroup, StyledToggleButton } from './styles';

const RecipeCategoryFilter = () => {
  const [checkedValue, setCheckedValue] = useState('');
  const categories = useSelector((state) => state.recipes.categories);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const setToggleButton = (value) => {
    if (value === checkedValue) {
      setCheckedValue('');
      dispatch(setFilter(FILTER_TYPES.NAME));
    } else {
      setCheckedValue(value);
      dispatch(setFilter(FILTER_TYPES.CATEGORY, value));
    }
  };

  useEffect(() => {
    const getCategories = (type) => dispatch(fetchCategories(type));
    getCategories(pathname);
  }, [dispatch, pathname]);

  return (
    <StyledButtonGroup toggle>
      <StyledToggleButton
        key="all"
        data-testid="All-category-filter"
        type="checkbox"
        variant="secondary"
        value=""
        checked={ checkedValue === '' }
        onChange={ (e) => setToggleButton(e.currentTarget.value) }
      >
        All
      </StyledToggleButton>
      {categories.map((category) => (
        <StyledToggleButton
          key={ category }
          data-testid={ `${category}-category-filter` }
          type="checkbox"
          variant="secondary"
          value={ category }
          checked={ checkedValue === category }
          onChange={ (e) => setToggleButton(e.currentTarget.value) }
        >
          { category }
        </StyledToggleButton>
      ))}
    </StyledButtonGroup>
  );
};

export default RecipeCategoryFilter;
