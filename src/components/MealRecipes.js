import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes, fetchCategories } from '../actions';
import MealsCategoryFilter from './MealsCategoryFilter';
import Loading from './Loading';
import '../css/recipe.css';

class MealRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, requestCategories, endPoint } = this.props;
    requestCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes, getCategories } = this.props;
    const MEAL_LENGTH = 12;
    if (getRecipes.meals && getCategories.meals) {
      const filterArray = getRecipes.meals.filter((_meal, index) => index < MEAL_LENGTH);
      return (
        <div>
          <MealsCategoryFilter />
          <div className="main-recipes-categories">
            {filterArray.map((meal, index) => (
              <div
                key={ meal.idMeal }
                data-testid={ `${index}-recipe-card` }
                className="recipes-categories"
              >
                <Link
                  to={ `/comidas/${meal.idMeal}` }
                  className="link-categories"
                >
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                  <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <Loading />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (endPoint) => dispatch(fetchRecipes(endPoint)),
  requestCategories: (endPoint) => dispatch(fetchCategories(endPoint)),
});

const mapStateToProps = ({ recipesReducer, categories }) => ({
  getRecipes: recipesReducer.recipes,
  getCategories: categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealRecipes);

MealRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getCategories: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestCategories: PropTypes.func.isRequired,
};
