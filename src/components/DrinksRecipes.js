import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../actions';
import '../css/food.css';

class DrinksRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, endPoint } = this.props;
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes } = this.props;
    const DRINK_LENGTH = 12;
    // if (getRecipes.drinks) {
    //   if (getRecipes.drinks.length === 1) {
    //     return (<Redirect to={`/bebidas/${getRecipes.drinks[0].idDrink}`} />)
    //   }
    // }
    if (getRecipes.drinks === null) {
      return (alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      ));
    }
    if (getRecipes.drinks) {
      const filterArray = getRecipes.drinks
        .filter((_drink, index) => index < DRINK_LENGTH);
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

const mapStateToProps = ({ recipesReducer }) => ({
  getRecipes: recipesReducer.recipes,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksRecipes);

DrinksRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
