import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipes } from '../actions';
import '../css/food.css';

class MealRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, endPoint } = this.props;
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes, isFetching } = this.props;
    const MEAL_LENGTH = 12;

    if (!isFetching) {
      const filterArray = getRecipes.filter((_meal, index) => index < MEAL_LENGTH);
      return (
        <div>
          {filterArray.map((meal, index) => (
            <div key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>
            </div>
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

const mapStateToProps = ({ recipes }) => ({
  getRecipes: recipes.recipes.meals,
  isFetching: recipes.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealRecipes);

MealRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
