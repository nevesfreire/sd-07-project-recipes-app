import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCategories, setFilterByCategory } from '../../store/ducks/recipes';

import { StyledButtonGroup, StyledToggleButton } from './styles';

const RecipeCategoryFilter = () => {
  const [checkedValue, setCheckedValue] = useState('');
  const categories = useSelector((state) => state.recipes.categories);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const setToggleButton = (value) => {
    setCheckedValue(value === checkedValue ? '' : value);
  };

  useEffect(() => {
    const getCategories = async (type) => dispatch(await fetchCategories(type));
    getCategories(pathname);
  }, [dispatch, pathname]);

  useEffect(() => {
    const setFilter = async (category) => (
      dispatch(await setFilterByCategory(category))
    );
    setFilter(checkedValue);
  }, [dispatch, checkedValue]);

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
