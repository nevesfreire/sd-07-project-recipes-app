import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { foodFilterByCategory, getFoodRecipes } from '../services';
import { drinksFilteredByCategory, getDrinkRecipes } from '../services/drinkApi';

class CustomDropCartegory extends Component {
  render() {
    const {
      mealsCategories,
      title,
      dispatchFoodFilteredByCategory,
      dispatchDrinkFilteredByCategory,
      currentCategoryFood,
      dispatchFoodRecipes,
      dispatchDrinksRecipes,
      currentCategoryDrink,
    } = this.props;
    const MAX_LENGTH = 12;
    const INITIAL_LENGTH = 0;
    return (
      <select
        data-testid="explore-by-area-dropdown"
      >
        <option
          data-testid="All-category-filter"
          type="button"
          onClick={ () => dispatchFoodRecipes({}) }
        >
          ALL
        </option>
        {mealsCategories.slice(INITIAL_LENGTH, MAX_LENGTH).map((category, index) => (
          <option
            key={ index }
            onClick={ () => {
              if (currentCategoryFood === category.strCategory
            || currentCategoryDrink === category.strCategory
              ) {
                return title === 'Comidas' ? dispatchFoodRecipes({})
                  : dispatchDrinksRecipes({});
              }
              if (title === 'Comidas') dispatchFoodFilteredByCategory(category);
              if (title === 'Bebidas') dispatchDrinkFilteredByCategory(category);
            } }
          >
            {category.strCategory}
          </option>
        ))}
      </select>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategoryDrink: state.drinkRecipesReducer.currentCategoryDrink,
  currentCategoryFood: state.foodRecipesReducer.currentCategoryFood,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchDrinksRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchDrinkFilteredByCategory: (category) => {
    dispatch(drinksFilteredByCategory(category));
  },
  dispatchFoodFilteredByCategory: (category) => {
    dispatch(foodFilterByCategory(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDropCartegory);

CustomDropCartegory.propTypes = {
  mealsCategories: PropTypes.func.isRequired,
  category: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  currentCategoryFood: PropTypes.string.isRequired,
  currentCategoryDrink: PropTypes.string.isRequired,
  dispatchFoodFilteredByCategory: PropTypes.func.isRequired,
  dispatchDrinkFilteredByCategory: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  dispatchDrinksRecipes: PropTypes.func.isRequired,
};
