import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipes, changeFetching } from '../actions';
import '../css/food.css';

class MealRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, endPoint, updateFetching, isFetching } = this.props;
    if (isFetching === false) {
      updateFetching();
    }
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes, isFetching } = this.props;
    const MEAL_LENGTH = 12;
    // console.log(getRecipes);
    if (getRecipes.meals) {
      const filterArray = getRecipes.meals.filter((_meal, index) => index < MEAL_LENGTH);
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
  updateFetching: () => dispatch(changeFetching()),
});

const mapStateToProps = ({ recipes }) => ({
  getRecipes: recipes.recipes,
  isFetching: recipes.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealRecipes);

MealRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
