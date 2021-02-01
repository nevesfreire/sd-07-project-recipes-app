import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../actions';
import '../css/food.css';

class DrinksRecipes extends Component {
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
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    this.setState({ recipesByCategory: data });
  }

  render() {
    const { getRecipes } = this.props;
    const { recipesByCategory } = this.state;

    const DRINK_LENGTH = 12;

    if (getRecipes.drinks) {
      let filterArray = [];
      if (recipesByCategory.drinks) {
        filterArray = recipesByCategory.drinks
          .filter((_drink, index) => index < DRINK_LENGTH);
      } else {
        filterArray = getRecipes.drinks
          .filter((_drink, index) => index < DRINK_LENGTH);
      }
      return (
        <div>
          {filterArray.map((drink, index) => (
            <Link
              to={ `/bebidas/${drink.idDrink}` }
              key={ drink.strDrink }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrinksRecipes);

DrinksRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
