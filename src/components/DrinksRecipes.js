import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipes, changeFetching } from '../actions';
import '../css/food.css';

class DrinksRecipes extends Component {
  componentDidMount() {
    const { requestRecipes, endPoint, updateFetching, isFetching } = this.props;
    if (isFetching === false) {
      updateFetching();
    }
    requestRecipes(endPoint);
  }

  render() {
    const { getRecipes, isFetching } = this.props;
    const DRINK_LENGTH = 12;
    // console.log(getRecipes);
    if (getRecipes.drinks) {
      console.log(getRecipes);
      const filterArray = getRecipes.drinks.filter((_drink, index) => index < DRINK_LENGTH);
      return (
        <div>
          {filterArray.map((drink, index) => (
            <div key={ drink.strDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrinksRecipes);

DrinksRecipes.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  getRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
