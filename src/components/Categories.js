import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import Button from 'react-bootstrap/Button';

function Categories({ list, type }) {
  const { selectedCategory, randomFoodFetch, randomDrinkFetch } = useFetch();
  const [filtered, setFiltered] = useState(false);
  const [previousCategory, setPreviousCategory] = useState('initial');

  function allFilter() {
    if (type === 'drinks') {
      randomDrinkFetch();
      setFiltered(false);
    }
    if (type === 'meals') {
      randomFoodFetch();
      setFiltered(false);
    }
    return null;
  }

  function lowerComplex(category, typeOfRecipe, event) {
    const { value } = event.target;
    const { strCategory } = category;
    if (filtered === true && typeOfRecipe === 'meals' && value === previousCategory) {
      randomFoodFetch();
      setFiltered(!filtered);
    }
    if (filtered === true && typeOfRecipe === 'drinks' && value === previousCategory) {
      randomDrinkFetch();
      setFiltered(!filtered);
    }
    if (filtered === true && typeOfRecipe === 'meals' && value !== previousCategory) {
      selectedCategory(strCategory, typeOfRecipe);
      setFiltered(!filtered);
    }
  }

  function handleClick(category, typeOfRecipe, event) {
    const { value } = event.target;
    const { strCategory } = category;
    if (filtered === false && value !== previousCategory) {
      selectedCategory(strCategory, typeOfRecipe);
      setFiltered(!filtered);
      setPreviousCategory(value);
    }
    lowerComplex(category, typeOfRecipe, event);
    if (filtered === true && typeOfRecipe === 'drinks' && value !== previousCategory) {
      selectedCategory(strCategory, typeOfRecipe);
      setFiltered(!filtered);
    }
    if (filtered === false && value === previousCategory) {
      selectedCategory(strCategory, typeOfRecipe);
      setFiltered(!filtered);
    }
  }
  return (
    <div>
      <Button
        variant="primary"
        type="button"
        onClick={ () => allFilter() }
        data-testid="All-category-filter"
      >
        All

      </Button>
      {list.map((category) => (
        <Button
          variant="primary"
          onClick={ (event) => handleClick(category, type, event) }
          value={ category.strCategory }
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </Button>))}
    </div>
  );
}

Categories.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Categories;
