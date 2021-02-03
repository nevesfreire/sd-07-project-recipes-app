import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes, fetchCategories, setCategory } from '../actions';
import Loading from './Loading';
import '../css/recipe.css';

class MealRecipes extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipesByCategory = this.fetchRecipesByCategory.bind(this);
    this.state = {
      recipesByCategory: {},
    };
  }

  componentDidMount() {
    const { requestRecipes, requestCategories, endPoint } = this.props;
    requestCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    requestRecipes(endPoint);
  }

  componentDidUpdate(prevProps) {
    const { selectedCategory } = this.props;
    if (selectedCategory !== prevProps.selectedCategory && selectedCategory !== 'All') {
      this.fetchRecipesByCategory();
    }
    // if (selectedCategory === prevProps.selectedCategory) {
    //   selectCategory('All');
    // }
  }

  async fetchRecipesByCategory() {
    const { selectedCategory } = this.props;
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({ recipesByCategory: data });
  }

  render() {
    const { getRecipes, selectedCategory } = this.props;
    const { recipesByCategory } = this.state;

    const MEAL_LENGTH = 12;
    if (getRecipes.meals === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (getRecipes.meals) {
      let filterArray = [];
      if (recipesByCategory.meals && (selectedCategory !== 'All')) {
        filterArray = recipesByCategory.meals
          .filter((_meal, index) => index < MEAL_LENGTH);
      } else filterArray = getRecipes.meals.filter((_meal, index) => index < MEAL_LENGTH);

      return (
        <div className="main-recipes-categories">
          {filterArray.map((meal, index) => (
            <div
              key={ meal.strMeal }
              data-testid={ `${index}-recipe-card` }
              className="recipes-categories"
            >
              <Link
                to={ `/comidas/${meal.idMeal}` }
                key={ meal.idMeal }
                className="link-categories"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>
              </Link>
            </div>
          ))}
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
  selectCategory: (category) => dispatch(setCategory(category)),
});

const mapStateToProps = ({ recipesReducer, categoriesReducer }) => ({
  getRecipes: recipesReducer.recipes,
  selectedCategory: categoriesReducer.selectedCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealRecipes);

MealRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestCategories: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
