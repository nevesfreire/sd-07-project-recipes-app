import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import {
  fetchApi, getFoodCategory, getDrinksCategory, allFood, allDrink,
} from '../services/fetchApi';

const filterCategory = async (pathname, category, state, setState) => {
  if (category !== 'All' && category !== state.filtered) {
    if (pathname === '/comidas') {
      const newData = await fetchApi(getFoodCategory(category));
      setState((s) => ({
        ...s,
        data: { ...s.data, food: newData.meals },
        filtered: category,
      }));
    } else if (pathname === '/bebidas') {
      const newData = await fetchApi(getDrinksCategory(category));
      setState((s) => ({
        ...s,
        data: { ...s.data, beverage: newData.drinks },
        filtered: category,
      }));
    }
  }
  if (category === 'All' || category === state.filtered) {
    if (pathname === '/comidas') {
      const newData = await fetchApi(allFood);
      setState((s) => ({
        ...s,
        data: { ...s.data, food: newData.meals },
        filtered: '',
      }));
    } else if (pathname === '/bebidas') {
      const newData = await fetchApi(allDrink);
      setState((s) => ({
        ...s,
        data: { ...s.data, beverage: newData.drinks },
        filtered: '',
      }));
    }
  }
};

const CategoryButton = (props) => {
  const {
    category,
    pathname,
  } = props;

  const { state, setState } = useContext(context);

  return (
    <Button
      variant="contained"
      data-testid={ `${category}-category-filter` }
      type="button"
      onClick={ () => filterCategory(pathname, category, state, setState) }
      className="category-button"
    >
      {category}
    </Button>
  );
};

CategoryButton.propTypes = {
  pathname: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
