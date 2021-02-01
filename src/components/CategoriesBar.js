import React, { useEffect } from 'react';
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
    searchMealsCategories,
    searchCocktailsCategories,
  } = props;

  const handleClick = (event) => {
    event.preventDefault();
    const { name } = event.target;
    let { className } = event.target;
    if (title === 'Comidas') {
      if (className === 'selected') {
        searchByMeals(ALL, props);
        className = '';
      } else {
        searchByMeals(name, props);
        className = 'selected';
      }
    }
    if (title === 'Bebidas') {
      if (className === 'selected') {
        searchByCocktails(ALL, props);
        className = '';
      } else {
        searchByCocktails(name, props);
        className = 'selected';
      }
    }
  };

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
        { mealsCategories.slice(0, 5).map((categorie, index) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar);
