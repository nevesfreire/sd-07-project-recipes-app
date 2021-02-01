import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  fetchRandomMeals,
  fetchMealsByCategory,
  fetchMealsCategories,
} from '../actions/meals';

import {
  fetchRandomCocktails,
  fetchCocktailsByCategory,
  fetchCocktailsCategories,
} from '../actions/cocktails';

const ALL = 'all';

const searchByMeals = (name, {
  searchRandomMeals,
  searchMealsByCategory,
}) => {
  if (name === ALL) {
    searchRandomMeals();
  } else {
    searchMealsByCategory(name);
  }
};

const searchByCocktails = (name, {
  searchRandomCocktails,
  searchCocktailsByCategory,
}) => {
  if (name === ALL) {
    searchRandomCocktails();
  } else {
    searchCocktailsByCategory(name);
  }
};

function CategoriesBar(props) {
  const {
    toggle,
    title,
    meals,
    cocktails,
    mealsCategories,
  } = props;

  const handleClick = (event) => {
    event.preventDefault();
    const { name, className } = event.target;
    if (title === 'Comidas') {
      if (className === 'selected') {
        searchByMeals(ALL, props);
        event.target.className = '';
      } else {
        searchByMeals(name, props);
        event.target.className = 'selected';
      }
    }
    if (title === 'Bebidas') {
      if (className === 'selected') {
        searchByCocktails(ALL, props);
        event.target.className = '';
      } else {
        searchByCocktails(name, props);
        event.target.className = 'selected';
      }
    }
  };
  const zero = 0;
  const five = 5;
  return (
    <div style={ { display: toggle ? 'none' : 'inline' } }>
      {meals.length === 1 && (
        <Redirect
          to={ { pathname: `/comidas/${meals[0].idMeal}` } }
        />
      )}
      {cocktails.length === 1 && (
        <Redirect
          to={ { pathname: `/bebidas/${cocktails[0].idDrink}` } }
        />
      )}
      <div>
        <button
          type="button"
          name={ ALL }
        >
          All
        </button>
        { mealsCategories.slice(zero, five).map((categorie, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${categorie.strCategory}-category-filter` }
            name={ categorie.strCategory }
            onClick={ handleClick }
          >
            { categorie.strCategory }
          </button>
        ))}
      </div>
    </div>
  );
}

CategoriesBar.propTypes = {
  toggle: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ searchToggleReducer, meals, cocktails }) => ({
  toggle: searchToggleReducer,
  meals: meals.meals,
  mealsCategories: meals.mealsCategories,
  cocktails: cocktails.cocktails,
  cocktailsCategories: cocktails.cocktailsCategories,
  loadMealsCategories: meals.isFetchingCategories,
  loadCocktailsCategories: cocktails.isFetchingCategories,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
  searchMealsByCategory: (category) => dispatch(fetchMealsByCategory(category)),
  searchRandomCocktails: () => dispatch(fetchRandomCocktails()),
  searchCocktailsByCategory: (category) => dispatch(fetchCocktailsByCategory(category)),
  searchMealsCategories: () => dispatch(fetchMealsCategories()),
  searchCocktailsCategories: () => dispatch(fetchCocktailsCategories()),
});

CategoriesBar.propTypes = {
  title: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cocktails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  mealsCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar);
