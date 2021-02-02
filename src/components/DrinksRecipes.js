import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes, fetchCategories } from '../actions';
import Loading from './Loading';
import '../css/recipe.css';

class DrinksRecipes extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipesByCategory = this.fetchRecipesByCategory.bind(this);
    this.state = {
      recipesByCategory: {},
    };
  }

  componentDidMount() {
    const { requestRecipes, requestCategories, endPoint } = this.props;
    requestCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    requestRecipes(endPoint);
  }

  componentDidUpdate(prevProps) {
    const { selectedCategory } = this.props;
    if (selectedCategory !== prevProps.selectedCategory && selectedCategory !== 'All') {
      this.fetchRecipesByCategory();
    }
  }

  async fetchRecipesByCategory() {
    const { selectedCategory } = this.props;
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({ recipesByCategory: data });
  }

  render() {
    const { getRecipes, selectedCategory } = this.props;
    const { recipesByCategory } = this.state;

    const DRINK_LENGTH = 12;
    if (getRecipes.drinks === null) {
      return (alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      ));
    }
    if (getRecipes.drinks) {
      let filterArray = [];
      if (recipesByCategory.drinks && (selectedCategory !== 'All')) {
        filterArray = recipesByCategory.drinks
          .filter((_drink, index) => index < DRINK_LENGTH);
      } else {
        filterArray = getRecipes.drinks
          .filter((_drink, index) => index < DRINK_LENGTH);
      }
      return (
        <div>
          <div className="main-recipes-categories">
            {filterArray.map((drink, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                className="recipes-categories"
                key={ drink.strDrink }
              >
                <Link
                  to={ `/bebidas/${drink.idDrink}` }
                  className="link-categories"
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
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

const mapStateToProps = ({ recipesReducer, categoriesReducer }) => ({
  getRecipes: recipesReducer.recipes,
  selectedCategory: categoriesReducer.selectedCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksRecipes);

DrinksRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  getRecipes: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getCategories: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestCategories: PropTypes.func.isRequired,
};
