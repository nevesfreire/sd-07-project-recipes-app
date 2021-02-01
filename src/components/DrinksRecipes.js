import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes, fetchCategories } from '../actions';
import Loading from './Loading';
import DrinksCategoryFilter from './DrinksCategoryFilter';
import '../css/recipe.css';

class DrinksRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, requestCategories, endPoint } = this.props;
    requestCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes, getCategories } = this.props;
    const DRINK_LENGTH = 12;
    // console.log(getRecipes);
    if (getRecipes.drinks && getCategories.drinks) {
      // console.log(getRecipes);
      const filterArray = getRecipes.drinks
        .filter((_drink, index) => index < DRINK_LENGTH);
      return (
        <div>
          <DrinksCategoryFilter />
          <div className="main-recipes-categories">
            {filterArray.map((drink, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                className="recipes-categories"
                key={ drink.strDrink }
              >
                <Link
                  to={ `/bebidas/${drink.idDrink}` }
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

const mapStateToProps = ({ recipesReducer, categories }) => ({
  getRecipes: recipesReducer.recipes,
  getCategories: categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksRecipes);

DrinksRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
