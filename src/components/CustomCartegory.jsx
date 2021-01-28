import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foodFilterByCategory } from '../services';
import { drinksFilteredByCategory } from '../services/drinkApi';

class CustomCartegory extends Component {
  render() {
    const {
      category,
      title,
      dispatchFoodFilteredByCategory,
      dispatchDrinkFilteredByCategory,
    } = this.props;
    return (
      <button
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
        onClick={ () => {
          console.log(title);
          if (title === 'Comidas') dispatchFoodFilteredByCategory(category);
          if (title === 'Bebidas') dispatchDrinkFilteredByCategory(category);
        } }
      >
        {category.strCategory}
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinkFilteredByCategory: (category) => {
    dispatch(drinksFilteredByCategory(category));
  },
  dispatchFoodFilteredByCategory: (category) => {
    dispatch(foodFilterByCategory(category));
  },
});

export default connect(null, mapDispatchToProps)(CustomCartegory);
