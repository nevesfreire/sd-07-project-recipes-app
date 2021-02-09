import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { fetchApi, getFoodCategory, getDrinksCategory } from '../services/fetchApi';

const filterCategory = async (pathname, category, setState) => {
  if (pathname === '/comidas') {
    const newData = await fetchApi(getFoodCategory(category));
    setState((s) => ({
      ...s,
      data: newData.meals,
      recipeStr: 'strMeal',
    }));
  } else if (pathname === '/bebidas') {
    const newData = await fetchApi(getDrinksCategory(category));
    setState((s) => ({
      ...s,
      data: newData.drinks,
      recipeStr: 'strDrink',
    }));
  }
};

const CategoryButton = (props) => {
  const {
    category,
    pathname,
  } = props;

  const { setState } = useContext(context);

  return (
    <Button
      variant="contained"
      data-testid={ `${category}-category-filter` }
      type="button"
      onClick={ () => filterCategory(pathname, category, setState) }
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
