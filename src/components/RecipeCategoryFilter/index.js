import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCategories } from '../../store/ducks/categories';
import { setFilter } from '../../store/ducks/recipes';
import { FILTER_TYPES } from '../../services/recipeAPI';
import { StyledButtonGroup, StyledToggleButton } from './styles';

const RecipeCategoryFilter = () => {
  const [checkedValue, setCheckedValue] = useState('');
  const categories = useSelector((state) => state.categories.data);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const setToggleButton = (newValue) => {
    if ((newValue && newValue === checkedValue)
      || (!newValue && newValue !== checkedValue)) {
      setCheckedValue('');
      dispatch(setFilter('home', FILTER_TYPES.NAME));
    } else if (newValue !== checkedValue) {
      setCheckedValue(newValue);
      dispatch(setFilter('home', FILTER_TYPES.CATEGORY, newValue));
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
      { categories && categories.map((category) => (
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
