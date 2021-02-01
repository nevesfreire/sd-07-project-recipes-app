import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../actions';
import '../css/food.css';

class MealRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, endPoint } = this.props;
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes } = this.props;
    const MEAL_LENGTH = 12;
    if (getRecipes.meals) {
      const filterArray = getRecipes.meals.filter((_meal, index) => index < MEAL_LENGTH);
      return (
        <div>
          {filterArray.map((meal, index) => (
            <Link
              to={ `/comidas/${meal.idMeal}` }
              key={ meal.idMeal }
            >
              <div key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>
              </div>
            </Link>
          ))}
        </div>
      );
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (endPoint) => dispatch(fetchRecipes(endPoint)),
});

const mapStateToProps = ({ recipesReducer }) => ({
  getRecipes: recipesReducer.recipes,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealRecipes);

MealRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
