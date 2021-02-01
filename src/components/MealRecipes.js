import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../actions';
import '../css/food.css';

class MealRecipes extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipesByCategory = this.fetchRecipesByCategory.bind(this);
    this.state = {
      recipesByCategory: {},
    };
  }

  componentDidMount() {
    const { requestRecipes, endPoint } = this.props;
    requestRecipes(endPoint);
  }

  componentDidUpdate(prevProps) {
    const { selectedCategory } = this.props;
    if (selectedCategory !== prevProps.selectedCategory) this.fetchRecipesByCategory();
  }

  async fetchRecipesByCategory() {
    const { selectedCategory } = this.props;
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    this.setState({ recipesByCategory: data });
  }

  render() {
    const { getRecipes } = this.props;
    const { recipesByCategory } = this.state;

    const MEAL_LENGTH = 12;
    if (getRecipes.meals) {
      let filterArray = [];
      if (recipesByCategory.meals) {
        filterArray = recipesByCategory.meals
          .filter((_meal, index) => index < MEAL_LENGTH);
      } else filterArray = getRecipes.meals.filter((_meal, index) => index < MEAL_LENGTH);

      return (
        <div>
          {filterArray.map((meal, index) => (
            <Link
              to={ `/comidas/${meal.idMeal}` }
              key={ meal.idMeal }
            >
              <div key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
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

const mapStateToProps = ({ recipesReducer, categoriesReducer }) => ({
  getRecipes: recipesReducer.recipes,
  selectedCategory: categoriesReducer.selectedCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealRecipes);

MealRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
